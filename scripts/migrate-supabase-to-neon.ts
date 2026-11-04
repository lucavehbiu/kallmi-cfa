/**
 * One-off copy of stay_bookings, restaurant_reservations and seasonal_rates
 * from Supabase (REST API, plain fetch) into Neon. Idempotent: rows that
 * already exist in Neon (same primary key) are skipped.
 *
 * Usage (after running db/schema.sql on Neon):
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   DATABASE_URL=postgres://... \
 *   npx tsx scripts/migrate-supabase-to-neon.ts
 *
 * Falls back to NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY (the names the
 * app used before) if the primary names are not set.
 */
import { neon } from '@neondatabase/serverless'

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || ''
const DATABASE_URL = process.env.DATABASE_URL || ''

if (!SUPABASE_URL || !SUPABASE_KEY || !DATABASE_URL) {
  console.error('Missing env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and DATABASE_URL are required.')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

type Row = Record<string, unknown>

const TABLES: { name: string; key: string; columns: string[]; identity: boolean }[] = [
  {
    name: 'stay_bookings',
    key: 'id',
    identity: true,
    columns: ['id', 'name', 'email', 'phone', 'room_id', 'room_name', 'guests', 'check_in', 'check_out', 'special_requests', 'status', 'created_at'],
  },
  {
    name: 'restaurant_reservations',
    key: 'id',
    identity: true,
    columns: ['id', 'name', 'email', 'phone', 'reservation_date', 'reservation_time', 'guests', 'special_requests', 'status', 'created_at'],
  },
  {
    name: 'seasonal_rates',
    key: 'month',
    identity: false,
    columns: ['month', 'rate', 'created_at'],
  },
]

const PAGE_SIZE = 1000 // PostgREST default max rows per request

function supabaseHeaders(extra: Record<string, string> = {}) {
  return { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, ...extra }
}

// Pages with limit/offset (PostgREST caps each response at 1000 rows).
async function fetchAll(table: string, key: string): Promise<Row[]> {
  const rows: Row[] = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?select=*&order=${key}.asc&limit=${PAGE_SIZE}&offset=${offset}`,
      { headers: supabaseHeaders() },
    )
    if (!res.ok) throw new Error(`Supabase ${table}: ${res.status} ${await res.text()}`)
    const page = (await res.json()) as Row[]
    rows.push(...page)
    if (page.length < PAGE_SIZE) return rows
  }
}

async function neonCount(table: string): Promise<number> {
  const [row] = await sql.query(`select count(*)::int as n from ${table}`)
  return row.n as number
}

async function migrateTable(t: (typeof TABLES)[number]) {
  const rows = await fetchAll(t.name, t.key)

  if (t.identity) {
    const bad = rows.find((r) => !Number.isInteger(Number(r[t.key])))
    if (bad) {
      throw new Error(`${t.name}: id ${String(bad[t.key])} is not an integer; db/schema.sql expects bigint ids.`)
    }
  }

  let inserted = 0
  for (const row of rows) {
    // Only copy known columns; columns missing on the Supabase side fall back to Neon defaults.
    const cols = t.columns.filter((c) => c in row)
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ')
    const result = await sql.query(
      `insert into ${t.name} (${cols.join(', ')}) values (${placeholders}) on conflict (${t.key}) do nothing returning ${t.key}`,
      cols.map((c) => row[c]),
    )
    inserted += result.length
  }

  if (t.identity) {
    // Move the identity sequence past the copied ids so new inserts don't collide.
    await sql.query(
      `select setval(pg_get_serial_sequence('${t.name}', '${t.key}'), coalesce((select max(${t.key}) from ${t.name}), 0) + 1, false)`,
    )
  }

  console.log(`${t.name}: fetched ${rows.length}, inserted ${inserted}, skipped ${rows.length - inserted} (already present)`)
  return rows.length
}

async function main() {
  const supabaseCounts: Record<string, number> = {}
  for (const t of TABLES) {
    supabaseCounts[t.name] = await migrateTable(t)
  }

  console.log('\nRow counts')
  console.log('table'.padEnd(26) + 'supabase'.padStart(10) + 'neon'.padStart(10))
  let mismatch = false
  for (const t of TABLES) {
    const s = supabaseCounts[t.name]
    const n = await neonCount(t.name)
    if (s !== n) mismatch = true
    console.log(t.name.padEnd(26) + String(s).padStart(10) + String(n).padStart(10) + (s === n ? '' : '  <-- differs'))
  }
  if (mismatch) {
    console.log('\nCounts differ: Neon may hold rows created after cutover, or some inserts failed. Check above.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
