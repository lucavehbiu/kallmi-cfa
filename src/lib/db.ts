import { neon, types, type NeonQueryFunction } from '@neondatabase/serverless'

// Postgres type OIDs whose default parsers would change the row shapes
// callers rely on (they were built against Supabase's JSON responses).
const DATE = 1082 // keep 'YYYY-MM-DD' strings, not Date objects
const TIMESTAMPTZ = 1184 // ISO strings, not Date objects

const typeParsers = {
  getTypeParser(oid: number, format?: 'text' | 'binary') {
    if (oid === DATE) return (v: string) => v
    if (oid === TIMESTAMPTZ) {
      const parse = types.getTypeParser(TIMESTAMPTZ)
      return (v: string) => (parse(v) as Date).toISOString()
    }
    return types.getTypeParser(oid, format)
  },
}

let _sql: NeonQueryFunction<false, false> | null = null

// Lazy so importing this module never needs DATABASE_URL (e.g. during build).
export function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL is not set')
    _sql = neon(url, { types: typeParsers })
  }
  return _sql
}
