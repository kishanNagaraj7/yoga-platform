import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

const SupabaseBackendTest: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const checkAuthStatus = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      setUser(user);
      addResult({
        success: true,
        message: 'Auth status checked',
        data: { user: user?.email, userId: user?.id }
      });
    } catch (error: any) {
      addResult({
        success: false,
        message: 'Failed to check auth status',
        error: error.message
      });
    }
  };

  const testJwtValidation = async () => {
    if (!user) {
      addResult({
        success: false,
        message: 'No user logged in - please login first'
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      const response = await fetch('http://localhost:8080/api/supabase/test', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      addResult({
        success: response.ok,
        message: `JWT Validation Test (${response.status})`,
        data: result
      });
    } catch (error: any) {
      addResult({
        success: false,
        message: 'JWT Validation Test Failed',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testProtectedEndpoint = async () => {
    if (!user) {
      addResult({
        success: false,
        message: 'No user logged in - please login first'
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      const response = await fetch('http://localhost:8080/api/supabase/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      addResult({
        success: response.ok,
        message: `Protected Endpoint Test (${response.status})`,
        data: result
      });
    } catch (error: any) {
      addResult({
        success: false,
        message: 'Protected Endpoint Test Failed',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testPublicEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/supabase/public', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      addResult({
        success: response.ok,
        message: `Public Endpoint Test (${response.status})`,
        data: result
      });
    } catch (error: any) {
      addResult({
        success: false,
        message: 'Public Endpoint Test Failed',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'kishannagaraj5@gmail.com',
        password: 'your-password' // User needs to enter actual password
      });

      if (error) throw error;
      
      setUser(data.user);
      addResult({
        success: true,
        message: 'Login successful',
        data: { user: data.user?.email, userId: data.user?.id }
      });
    } catch (error: any) {
      addResult({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      addResult({
        success: true,
        message: 'Logout successful'
      });
    } catch (error: any) {
      addResult({
        success: false,
        message: 'Logout failed',
        error: error.message
      });
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🔐 Supabase Backend JWT Integration Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Current User Status</h3>
        <p><strong>Email:</strong> {user?.email || 'Not logged in'}</p>
        <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
        <p><strong>Authenticated:</strong> {user ? '✅ Yes' : '❌ No'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Authentication Actions</h3>
        <button onClick={login} style={{ margin: '5px', padding: '10px' }}>
          Login (kishannagaraj5@gmail.com)
        </button>
        <button onClick={logout} style={{ margin: '5px', padding: '10px' }}>
          Logout
        </button>
        <button onClick={checkAuthStatus} style={{ margin: '5px', padding: '10px' }}>
          Check Auth Status
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Backend API Tests</h3>
        <button onClick={testJwtValidation} disabled={loading || !user} style={{ margin: '5px', padding: '10px' }}>
          Test JWT Validation
        </button>
        <button onClick={testProtectedEndpoint} disabled={loading || !user} style={{ margin: '5px', padding: '10px' }}>
          Test Protected Endpoint
        </button>
        <button onClick={testPublicEndpoint} disabled={loading} style={{ margin: '5px', padding: '10px' }}>
          Test Public Endpoint
        </button>
        <button onClick={clearResults} style={{ margin: '5px', padding: '10px', backgroundColor: '#ff6b6b', color: 'white' }}>
          Clear Results
        </button>
      </div>

      <div>
        <h3>Test Results</h3>
        {testResults.length === 0 ? (
          <p>No tests run yet</p>
        ) : (
          testResults.map((result, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px',
                backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
                borderRadius: '5px'
              }}
            >
              <p><strong>{result.message}</strong></p>
              {result.data && (
                <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
              {result.error && (
                <p style={{ color: '#721c24' }}>Error: {result.error}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SupabaseBackendTest;
