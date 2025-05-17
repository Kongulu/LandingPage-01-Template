# SSL Checker for NodeDiag

This package contains everything needed to add comprehensive SSL certificate checking to your NodeDiag project.

## What's Included

1. **Core SSL Checking Logic**
   - Real certificate verification (not mocked data)
   - Detailed certificate information extraction
   - Certificate chain analysis
   - Security recommendations based on certificate status

2. **API Integration**
   - Ready-to-use API routes
   - Support for individual and bulk domain checks
   - Detailed reporting endpoints

3. **User Interface Components**
   - Clean, responsive UI for certificate checks
   - Interactive results display
   - Visual indicators for certificate status
   - External verification links

## Installation

See the [Integration Guide](./INTEGRATION-GUIDE.md) for step-by-step instructions on adding this to your NodeDiag project.

## Features

- Validates SSL certificates by making actual TLS connections
- Extracts detailed certificate information:
  - Issuer details
  - Valid from/to dates
  - Days remaining until expiration
  - TLS protocol & cipher information
- Provides actionable security recommendations
- Integrates with NodeDiag's reporting system
- Includes external verification links to SSL Labs and other tools

## Requirements

- Node.js 12+
- Express.js
- Modern browser support for UI components