'use client';

import { useState } from 'react';

interface ConnectionResult {
  success: boolean;
  environment?: string;
  data?: {
    version: string;
    current_time: string;
  };
  connection_info?: {
    host: string;
    port: number;
    database: string;
    proxy?: string;
    driver?: string;
  };
  error?: string;
}

export default function TestDrizzlePage() {
  const [result, setResult] = useState<ConnectionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-drizzle');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Drizzle Connection Test</h1>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Test the PostgreSQL connection using Drizzle over a SOCKS proxy (Fixie).
            </p>

            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Testing Connection...' : 'Test Connection with Drizzle'}
            </button>
          </div>

          {result && (
            <div className="mt-6">
              <div
                className={`p-4 rounded border ${
                  result.success
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="font-semibold">
                  {result.success ? 'Connection Successful!' : 'Connection Failed'}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <span className="font-medium text-gray-700">Environment:</span>
                  <p className="mt-1 text-sm text-gray-600">{result.environment || 'n/a'}</p>
                </div>

                {result.success && result.data && (
                  <>
                    <div>
                      <span className="font-medium text-gray-700">PostgreSQL Version:</span>
                      <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {result.data.version}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">Current Time:</span>
                      <p className="mt-1 text-sm text-gray-600">{result.data.current_time}</p>
                    </div>

                    {result.connection_info && (
                      <div>
                        <span className="font-medium text-gray-700">Connection Details:</span>
                        <div className="mt-1 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <div>Host: {result.connection_info.host}</div>
                          <div>Port: {result.connection_info.port}</div>
                          <div>Database: {result.connection_info.database}</div>
                          {result.connection_info.proxy && <div>Proxy: {result.connection_info.proxy}</div>}
                          {result.connection_info.driver && <div>Driver: {result.connection_info.driver}</div>}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {!result.success && result.error && (
                  <div>
                    <span className="font-medium text-gray-700">Error:</span>
                    <p className="mt-1 text-sm text-red-600 bg-red-50 p-2 rounded">{result.error}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded">
                <details>
                  <summary className="cursor-pointer font-medium text-gray-700">Raw Response (JSON)</summary>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap break-words mt-2">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 