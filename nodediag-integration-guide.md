# NodeDiag SSL Certificate Checker Integration Guide

This guide explains how to integrate the SSL certificate checking functionality into your existing NodeDiag project.

## Overview

The `ssl-module-for-nodediag.ts` file contains a complete implementation of SSL certificate checking that can be incorporated into NodeDiag. This module:

1. Verifies SSL certificates by making actual TLS connections
2. Extracts detailed certificate information (issuer, validity dates, expiration)
3. Performs both strict and fallback certificate validation
4. Captures additional TLS/SSL security details useful for diagnostics

## Integration Steps

### 1. Copy the Module

Copy the `ssl-module-for-nodediag.ts` file into your NodeDiag project's source directory.

### 2. Import the Module

In your NodeDiag main file or relevant diagnostic module:

```typescript
import { 
  performNodeDiagSSLCheck, 
  createSSLCheckEndpoint, 
  SSLCheckResult 
} from './ssl-module-for-nodediag';
```

### 3. Add to NodeDiag's Diagnostic Suite

Add SSL certificate checking to your existing diagnostics suite:

```typescript
// Example integration with existing NodeDiag structure
export async function runFullDiagnostics(domain: string) {
  const results = {
    // Your existing diagnostics
    headers: await checkSecurityHeaders(domain),
    cookies: await checkCookieSettings(domain),
    // Add the SSL certificate check
    ssl: await performNodeDiagSSLCheck(domain)
  };
  
  return results;
}
```

### 4. Add API Endpoint (if NodeDiag has a web interface)

If NodeDiag provides API endpoints, add a specific endpoint for SSL checking:

```typescript
// Express.js example
app.get('/api/check-ssl', createSSLCheckEndpoint);

// Or integrate with your existing endpoint structure
app.get('/api/check-ssl', (req, res) => {
  const domain = req.query.domain;
  if (!domain) {
    return res.status(400).json({ error: 'Domain parameter required' });
  }
  
  performNodeDiagSSLCheck(domain)
    .then(result => {
      // You might want to format or enrich the result here
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
```

### 5. Add to UI (if NodeDiag has a web interface)

If NodeDiag has a web interface, add an SSL certificate check section:

```html
<!-- Example UI section -->
<div class="diagnostic-section ssl-check">
  <h2>SSL Certificate Status</h2>
  <div id="ssl-results">
    <!-- Results will be populated here -->
  </div>
</div>
```

With corresponding JavaScript to handle and display the results.

## Module Features

### Certificate Validation

The module performs two types of validation:
- Strict validation (rejectUnauthorized: true) - How browsers validate certificates
- Fallback validation (rejectUnauthorized: false) - To extract details even from invalid certificates

### Certificate Information Extraction

For valid certificates, it extracts:
- Issuer details
- Valid from/to dates
- Days remaining until expiration
- Certificate chain details when available

### Additional Security Information

The module also attempts to capture:
- TLS protocol version
- Cipher suite
- Key exchange mechanism

## Customization

You can easily customize the module by:

1. Adding more fields to the `SSLCheckResult` interface
2. Enhancing the `extractCertInfo` function to extract additional certificate details
3. Modifying timeout values for different network environments
4. Adding integration with other security checks in NodeDiag

## Error Handling

The module includes comprehensive error handling to ensure it doesn't crash when:
- Certificates are invalid
- Domains are unreachable
- TLS connections fail
- Certificate data is malformed or unexpected

All errors are properly reported in the result object's `error` field.