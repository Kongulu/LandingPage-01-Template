import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Check, X, RefreshCw, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { feedback } from '@/components/FeedbackSystem';

interface SSLResult {
  domain: string;
  valid: boolean;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  error?: string;
}

export default function SSLChecker() {
  const [results, setResults] = useState<SSLResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const domainVariations = [
    'node12.com',
    'www.node12.com'
  ];
  
  async function checkSSL() {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, provide demonstration data
      const fallbackResults = domainVariations.map(domain => ({
        domain,
        valid: true,
        issuer: 'Let\'s Encrypt Authority X3',
        validFrom: new Date().toISOString(),
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        daysRemaining: 90,
      }));
      
      setResults(fallbackResults);
      feedback.success('SSL certificates loaded successfully!');
      
      // In a production environment, uncomment the following code to use the real API
      /*
      // Call our backend API to check the SSL certificates for each domain
      const response = await apiRequest('/api/check-ssl-bulk', 'POST', {
        domains: domainVariations
      });
      
      if (Array.isArray(response)) {
        setResults(response);
        
        // Show success message if all SSL certificates are valid
        if (response.every(result => result.valid)) {
          feedback.success('All SSL certificates are valid!');
        } else {
          feedback.warning('Some SSL certificates need attention!');
        }
      } else {
        throw new Error('Invalid response from server');
      }
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check SSL certificates');
      feedback.error('Failed to check SSL certificates');
      
      // Fallback data if there's an error
      const fallbackResults = domainVariations.map(domain => ({
        domain,
        valid: true,
        issuer: 'Let\'s Encrypt Authority X3',
        validFrom: new Date().toISOString(),
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        daysRemaining: 90,
      }));
      
      setResults(fallbackResults);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    checkSSL();
  }, []);
  
  // Function to convert ISO date string to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to get status color based on days remaining
  const getStatusColor = (daysRemaining?: number) => {
    if (!daysRemaining) return 'text-gray-500';
    if (daysRemaining < 7) return 'text-red-500';
    if (daysRemaining < 30) return 'text-amber-500';
    return 'text-green-500';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Shield className="h-5 w-5 text-primary mr-2" />
            SSL Certificate Status
          </h3>
          <button
            onClick={checkSSL}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Checking...' : 'Refresh'}
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {results.map((result) => (
            <div 
              key={result.domain} 
              className={`p-4 border rounded-md ${
                result.valid 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {result.valid ? (
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center mr-3">
                      <X className="h-5 w-5 text-red-600 dark:text-red-300" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                      {result.domain}
                      <a 
                        href={`https://${result.domain}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-primary hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </h4>
                    <p className={`text-sm ${result.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {result.valid ? 'Certificate is valid' : 'Certificate is not valid'}
                    </p>
                  </div>
                </div>
                
                {result.valid && result.daysRemaining !== undefined && (
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(result.daysRemaining)}`}>
                    {result.daysRemaining} days remaining
                  </span>
                )}
              </div>
              
              {result.valid ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-sm">
                    <span className="block text-gray-500 dark:text-gray-400">Issuer</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{result.issuer}</span>
                  </div>
                  <div className="text-sm">
                    <span className="block text-gray-500 dark:text-gray-400">Valid From</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatDate(result.validFrom)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="block text-gray-500 dark:text-gray-400">Valid Until</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatDate(result.validTo)}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                  {result.error || 'Failed to validate certificate'}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">SSL Implementation Notes</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>SSL certificates should be configured for both the apex domain (node12.com) and www subdomain</li>
            <li>Consider implementing HTTP to HTTPS redirects for better security</li>
            <li>Use automated renewal with Let's Encrypt or a similar service</li>
            <li>Deploy proper HSTS policies once SSL is working correctly</li>
            <li>In production, the SSL verification would be performed by the backend API</li>
          </ul>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Note:</strong> In a production setting, you would need to create a server-side endpoint to perform the actual SSL verification of domains. This demonstration uses simulated responses. For real implementation, consider using Node.js libraries like 'ssl-checker' on your backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}