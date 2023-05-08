import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase/database.types'

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
        provider: 'google'
    })
}

export function signOut() {
    return supabase.auth.signOut();
}