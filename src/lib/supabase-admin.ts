import { createClient } from '@supabase/supabase-js'

// Server-only admin client that bypasses RLS.
// Uses the service role key — NEVER expose this to the browser.
let _adminClient: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  if (!_adminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SECRET_KEY
    if (!url || !serviceKey) {
      throw new Error('SUPABASE_SECRET_KEY is not set')
    }
    _adminClient = createClient(url, serviceKey)
  }
  return _adminClient
}
