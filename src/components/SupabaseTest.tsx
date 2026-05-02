import React, { useState, useEffect } from 'react'
import { testSupabaseConnection, testSupabaseAuth, supabase } from '../services/supabaseClient'

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [authStatus, setAuthStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [authResult, setAuthResult] = useState<any>(null)
  const [testEmail, setTestEmail] = useState('test@example.com')
  const [testPassword, setTestPassword] = useState('password123')

  useEffect(() => {
    // Auto-test connection on component mount
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus('testing')
    const result = await testSupabaseConnection()
    setConnectionResult(result)
    setConnectionStatus(result.success ? 'success' : 'error')
  }

  const testAuth = async () => {
    setAuthStatus('testing')
    const result = await testSupabaseAuth()
    setAuthResult(result)
    setAuthStatus(result.success ? 'success' : 'error')
  }

  const testSignup = async () => {
    try {
      console.log('Testing signup...')
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('Email:', testEmail)
      console.log('Password length:', testPassword.length)
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword
      })
      
      console.log('Signup response:', { data, error })
      
      if (error) {
        console.error('Signup error details:', {
          message: error.message,
          status: error.status,
          code: error.code
        })
        alert(`Signup failed: ${error.message} (Status: ${error.status})`)
      } else {
        console.log('Signup successful:', data)
        
        // Check if user was created but email confirmation needed
        if (data.user && !data.session) {
          alert('Signup successful! Please check your email for confirmation.')
        } else if (data.user && data.session) {
          alert('Signup successful! Auto-logged in.')
          // Test auth after successful signup
          testAuth()
        }
      }
    } catch (err: any) {
      console.error('Signup failed with exception:', err)
      alert(`Signup failed: ${err.message}`)
    }
  }

  const testLogin = async () => {
    try {
      console.log('Testing login...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      })
      
      if (error) {
        console.error('Login error:', error)
        alert('Login failed: ' + error.message)
      } else {
        console.log('Login successful:', data)
        alert('Login successful!')
        // Test auth after login
        testAuth()
      }
    } catch (err: any) {
      console.error('Login failed:', err)
      alert('Login failed: ' + err.message)
    }
  }

  const testLogout = async () => {
    try {
      console.log('Testing logout...')
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        alert('Logout failed: ' + error.message)
      } else {
        console.log('Logout successful')
        alert('Logout successful!')
        // Test auth after logout
        testAuth()
      }
    } catch (err: any) {
      console.error('Logout failed:', err)
      alert('Logout failed: ' + err.message)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🧪 Supabase Connection Test</h2>
      
      {/* Connection Test */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Database Connection</h3>
        <button onClick={testConnection} disabled={connectionStatus === 'testing'}>
          {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
        </button>
        <div style={{ marginTop: '10px' }}>
          Status: <strong>{connectionStatus}</strong>
        </div>
        {connectionResult && (
          <div style={{ marginTop: '10px', fontSize: '12px', fontFamily: 'monospace' }}>
            <pre>{JSON.stringify(connectionResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Auth Test */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Authentication Test</h3>
        <button onClick={testAuth} disabled={authStatus === 'testing'}>
          {authStatus === 'testing' ? 'Testing...' : 'Test Auth'}
        </button>
        <div style={{ marginTop: '10px' }}>
          Status: <strong>{authStatus}</strong>
        </div>
        {authResult && (
          <div style={{ marginTop: '10px', fontSize: '12px', fontFamily: 'monospace' }}>
            <pre>{JSON.stringify(authResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Auth Actions */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Authentication Actions</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Test email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="password"
            placeholder="Test password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
        </div>
        <button onClick={testSignup} style={{ marginRight: '10px' }}>Test Signup</button>
        <button onClick={testLogin} style={{ marginRight: '10px' }}>Test Login</button>
        <button onClick={testLogout}>Test Logout</button>
      </div>

      {/* Environment Info */}
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Environment Variables</h3>
        <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
          <div>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
          <div>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</div>
        </div>
      </div>
    </div>
  )
}

export default SupabaseTest
