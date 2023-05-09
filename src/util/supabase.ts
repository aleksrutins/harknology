import { Session, createClient } from '@supabase/supabase-js'
import { Database } from './supabase/database.types'
import { ref } from 'vue'

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const authRef = ref<Session | null>(null)

supabase.auth.getSession().then(({data: {session}}) => {
    authRef.value = session
})

supabase.auth.onAuthStateChange((_ev, session) => {
    authRef.value = session
})

export function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
        provider: 'google'
    })
}

export function signOut() {
    return supabase.auth.signOut();
}