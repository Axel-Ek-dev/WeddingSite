import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Explicitly type the Supabase client to avoid excessive type-instantiation
 * issues from deep generic inference in @supabase/supabase-js.
 */
let supabase: SupabaseClient<any, 'public', any> | null = null

export function getSupabaseClient(): SupabaseClient<any, 'public', any> | null {
  if (supabase) return supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  // Provide explicit generics to `createClient` to prevent deep generic inference
  supabase = createClient<any, 'public', any>(url, key)
  return supabase
}
