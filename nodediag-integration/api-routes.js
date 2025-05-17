/**
 * API Routes for SSL Certificate Checker in NodeDiag
 * Add these routes to your existing NodeDiag Express router
 */

const express = require('express');
const router = express.Router();
const { performSSLCheck } = require('./ssl-checker');

/**
 * @route   GET /api/check-ssl
 * @desc    Check SSL certificate for a domain
 * @access  Public
 */
router.get('/check-ssl', async (req, res) => {
  try {
    const domain = req.query.domain;
    
    if (!domain) {
      return res.status(400).json({ 
        error: 'Domain parameter is required' 
      });
    }
    
    const result = await performSSLCheck(domain);
    res.json(result);
  } catch (error) {
    console.error('SSL check error:', error);
    res.status(500).json({ 
      error: error.message || 'Error checking SSL certificate' 
    });
  }
});

/**
 * @route   POST /api/bulk-check-ssl
 * @desc    Check SSL certificates for multiple domains
 * @access  Public
 */
router.post('/bulk-check-ssl', async (req, res) => {
  try {
    const { domains } = req.body;
    
    if (!domains || !Array.isArray(domains) || domains.length === 0) {
      return res.status(400).json({ 
        error: 'Please provide an array of domains' 
      });
    }
    
    if (domains.length > 10) {
      return res.status(400).json({ 
        error: 'Maximum 10 domains allowed per request' 
      });
    }
    
    // Run SSL checks in parallel for better performance
    const results = await Promise.all(
      domains.map(domain => performSSLCheck(domain))
    );
    
    res.json({ results });
  } catch (error) {
    console.error('Bulk SSL check error:', error);
    res.status(500).json({ 
      error: error.message || 'Error checking SSL certificates' 
    });
  }
});

/**
 * @route   GET /api/check-ssl/report
 * @desc    Generate comprehensive SSL report for a domain
 * @access  Public
 */
router.get('/check-ssl/report', async (req, res) => {
  try {
    const domain = req.query.domain;
    
    if (!domain) {
      return res.status(400).json({ 
        error: 'Domain parameter is required' 
      });
    }
    
    // Basic SSL check
    const sslResult = await performSSLCheck(domain);
    
    // Create detailed report
    const report = {
      domain,
      timestamp: new Date().toISOString(),
      sslResult,
      recommendations: generateSSLRecommendations(sslResult)
    };
    
    res.json(report);
  } catch (error) {
    console.error('SSL report error:', error);
    res.status(500).json({ 
      error: error.message || 'Error generating SSL certificate report' 
    });
  }
});

/**
 * Helper function to generate SSL recommendations based on check results
 * @param {Object} sslResult - Results from SSL check
 * @returns {Array} - List of recommendations
 */
function generateSSLRecommendations(sslResult) {
  const recommendations = [];
  
  if (!sslResult.valid) {
    recommendations.push({
      severity: 'high',
      title: 'Invalid SSL Certificate',
      description: sslResult.error || 'The SSL certificate for this domain is invalid.',
      action: 'Obtain a valid SSL certificate from a trusted certificate authority.'
    });
    return recommendations;
  }
  
  // Check certificate expiration
  if (sslResult.daysRemaining <= 0) {
    recommendations.push({
      severity: 'critical',
      title: 'Expired SSL Certificate',
      description: 'The SSL certificate has expired.',
      action: 'Renew the SSL certificate immediately.'
    });
  } else if (sslResult.daysRemaining <= 7) {
    recommendations.push({
      severity: 'high',
      title: 'SSL Certificate Expiring Very Soon',
      description: `The SSL certificate will expire in ${sslResult.daysRemaining} days.`,
      action: 'Renew the SSL certificate immediately.'
    });
  } else if (sslResult.daysRemaining <= 30) {
    recommendations.push({
      severity: 'medium',
      title: 'SSL Certificate Expiring Soon',
      description: `The SSL certificate will expire in ${sslResult.daysRemaining} days.`,
      action: 'Plan to renew the SSL certificate soon.'
    });
  }
  
  // Check if it's a wildcard certificate
  if (sslResult.securityInfo && sslResult.securityInfo.certificateChain && 
      sslResult.securityInfo.certificateChain.length > 0) {
    const mainCert = sslResult.securityInfo.certificateChain[0];
    if (mainCert && mainCert.subject && mainCert.subject.CN && 
        mainCert.subject.CN.startsWith('*.')) {
      recommendations.push({
        severity: 'info',
        title: 'Wildcard Certificate Detected',
        description: 'This domain is using a wildcard certificate.',
        action: 'Ensure the private key is properly secured, as compromise would affect multiple subdomains.'
      });
    }
  }
  
  return recommendations;
}

module.exports = router;