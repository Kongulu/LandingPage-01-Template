# NodeDiag SSL Checker Integration Guide

This guide explains how to integrate the SSL certificate checking functionality into your NodeDiag project.

## Files Overview

1. `ssl-checker.js` (Backend) - Core module with SSL certificate checking logic
2. `api-routes.js` - API route handlers for the SSL checker
3. `ssl-checker.html` - HTML template for the SSL checker UI component
4. `ssl-checker-ui.js` - JavaScript for the SSL checker UI

## Step 1: Add the Backend Module

1. Copy `ssl-checker.js` to your NodeDiag project's modules or utilities folder
2. If needed, install the required dependencies:
   ```
   npm install https url
   ```

## Step 2: Add the API Routes

1. Copy `api-routes.js` to your NodeDiag project
2. In your main Express app file, add the SSL checker routes:

```javascript
// In your main app.js or index.js
const express = require('express');
const app = express();

// Import the SSL checker routes
const sslCheckerRoutes = require('./path/to/api-routes');

// Use the routes with your API
app.use('/api', sslCheckerRoutes);

// Your existing routes and middleware...
```

## Step 3: Add the UI Components

1. Copy the `ssl-checker.html` content to your NodeDiag UI template
   - If you're using a templating engine (like EJS, Handlebars, etc.), adapt the HTML accordingly
   - Place it in the appropriate section of your NodeDiag dashboard

2. Copy the `ssl-checker-ui.js` to your project's public/js directory
   - Add a script tag to include this JavaScript in your page:
   ```html
   <script src="/js/ssl-checker-ui.js"></script>
   ```

3. Make sure you have the required CSS for styling the component
   - The component uses Bootstrap classes by default
   - If you're not using Bootstrap, you'll need to adapt the CSS classes

## Step 4: Integrate with NodeDiag Reports

The SSL checker is designed to integrate with NodeDiag's reporting system. To enable this:

1. In your NodeDiag report generation code, add a section for SSL certificate information:

```javascript
// Example integration with your reporting system
function generateSecurityReport(domain) {
  // Your existing code...
  
  // Add SSL check to the report
  const sslResult = await performSSLCheck(domain);
  report.sslCertificate = {
    status: sslResult.valid ? 'Valid' : 'Invalid',
    issuer: sslResult.issuer,
    validFrom: sslResult.validFrom,
    validTo: sslResult.validTo,
    daysRemaining: sslResult.daysRemaining,
    recommendations: generateSSLRecommendations(sslResult)
  };
  
  // Continue with your existing code...
  return report;
}
```

## Step 5: Test the Integration

1. Start your NodeDiag application
2. Navigate to the page where you added the SSL checker
3. Enter a domain (e.g., "google.com") and check that:
   - The API call works
   - Results are displayed correctly
   - Recommendations are generated appropriately

## Customization Options

### Changing API Endpoints

If you need to change the API endpoints, modify `api-routes.js` and update the corresponding fetch URLs in `ssl-checker-ui.js`.

### Styling the Component

The component uses common CSS classes that should work with most UI frameworks. If you need to customize the appearance:

1. Add custom CSS for the component
2. Modify class names in the HTML template

### Additional SSL Checks

If you want to add more comprehensive SSL checks:

1. Modify the `checkSSLCertificate` function in `ssl-checker.js`
2. Add additional security tests (e.g., supported ciphers, protocol versions)
3. Update the UI to display these additional checks

## Troubleshooting

### SSL Checker Not Loading

If the SSL checker component doesn't appear:
- Check browser console for JavaScript errors
- Verify that all files are correctly included
- Ensure DOM IDs match between HTML and JavaScript

### API Errors

If the SSL checker API returns errors:
- Check server logs for backend errors
- Verify network requests in the browser developer tools
- Ensure the API routes are correctly registered

### Certificate Verification Issues

Some domains might have complex certificate setups or network restrictions:
- Check firewall settings that might block outgoing HTTPS requests
- For internal domains, ensure they have valid and accessible certificates