import { createClient } from 'supabase'
import { Database } from '#util/supabase/database.types.ts'

export const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL')
        ?? (console.error('No Supabase URL provided'),''),
    Deno.env.get("SUPABASE_KEY")
        ?? (console.warn('No Supabase key provided'),'')
)