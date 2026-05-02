import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing from environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    console.log('URL:', supabaseUrl)
    
    // Test basic connection by checking if we can access the service
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Supabase connection successful!')
    return { success: true, data }
  } catch (err: any) {
    console.error('Supabase test failed:', err)
    return { success: false, error: err.message }
  }
}

// Test authentication
export const testSupabaseAuth = async () => {
  try {
    console.log('Testing Supabase auth...')
    
    // Get current session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Auth test error:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Auth test successful. Session:', session ? 'Active' : 'None')
    return { success: true, session }
  } catch (err: any) {
    console.error('Auth test failed:', err)
    return { success: false, error: err.message }
  }
}
