/**
 * SSL Certificate Checker JavaScript for NodeDiag UI
 * Include this script in your NodeDiag application to handle the SSL checker UI
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const sslCheckForm = document.getElementById('ssl-check-form');
  const domainInput = document.getElementById('domain-input');
  const loadingDiv = document.getElementById('ssl-loading');
  const resultsDiv = document.getElementById('ssl-results');
  const resultDomain = document.getElementById('result-domain');
  const sslStatusAlert = document.getElementById('ssl-status-alert');
  const sslIssuer = document.getElementById('ssl-issuer');
  const sslValidFrom = document.getElementById('ssl-valid-from');
  const sslValidTo = document.getElementById('ssl-valid-to');
  const sslDays = document.getElementById('ssl-days');
  const sslErrorContainer = document.getElementById('ssl-error-container');
  const sslError = document.getElementById('ssl-error');
  const sslSecurityInfo = document.getElementById('ssl-security-info');
  const sslProtocol = document.getElementById('ssl-protocol');
  const sslCipher = document.getElementById('ssl-cipher');
  const sslLabsLink = document.getElementById('ssl-labs-link');
  const sslCheckerLink = document.getElementById('ssl-checker-link');
  const recommendationsList = document.getElementById('recommendations-list');
  const addToReportBtn = document.getElementById('add-to-report-btn');
  
  // If any elements are missing, don't proceed (may be on a different page)
  if (!sslCheckForm) return;
  
  // Form submission event listener
  sslCheckForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get domain value
    const domain = domainInput.value.trim();
    if (!domain) return;
    
    // Show loading, hide results
    loadingDiv.style.display = 'block';
    resultsDiv.style.display = 'none';
    
    // Clear previous recommendations
    if (recommendationsList) {
      recommendationsList.innerHTML = '';
    }
    
    // Call the API to check SSL
    checkSSL(domain);
  });
  
  // Add to report button event listener
  if (addToReportBtn) {
    addToReportBtn.addEventListener('click', function() {
      const domain = resultDomain.textContent;
      // This would integrate with your NodeDiag report system
      // For now, just show a message
      alert(`SSL results for ${domain} added to security report`);
      
      // In a real implementation, you could call a function to add to the report
      // addToSecurityReport('ssl', { domain, results: currentResults });
    });
  }
  
  /**
   * Function to check SSL certificate for a domain
   * @param {string} domain - The domain to check
   */
  async function checkSSL(domain) {
    try {
      // Make API call to backend
      const response = await fetch(`/api/check-ssl?domain=${encodeURIComponent(domain)}`);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update UI with results
      displayResults(data);
      
      // Hide loading, show results
      loadingDiv.style.display = 'none';
      resultsDiv.style.display = 'block';
      
    } catch (error) {
      console.error('Error checking SSL:', error);
      
      // Display error in UI
      displayError(domain, error.message);
      
      // Hide loading, show results (with error)
      loadingDiv.style.display = 'none';
      resultsDiv.style.display = 'block';
    }
  }
  
  /**
   * Function to display the SSL check results in the UI
   * @param {Object} data - The SSL check result data
   */
  function displayResults(data) {
    // Set domain name
    resultDomain.textContent = data.domain;
    
    // Update status alert
    if (data.valid) {
      sslStatusAlert.textContent = 'Certificate is valid';
      sslStatusAlert.className = 'alert alert-success';
    } else {
      sslStatusAlert.textContent = 'Certificate is invalid';
      sslStatusAlert.className = 'alert alert-danger';
    }
    
    // Update certificate details
    sslIssuer.textContent = data.issuer || 'Unknown';
    sslValidFrom.textContent = formatDate(data.validFrom) || 'Unknown';
    sslValidTo.textContent = formatDate(data.validTo) || 'Unknown';
    
    // Update days remaining
    if (data.daysRemaining !== undefined) {
      sslDays.textContent = `${data.daysRemaining} days`;
      
      // Highlight expiration based on days remaining
      if (data.daysRemaining <= 0) {
        sslDays.className = 'result-value text-danger font-weight-bold';
      } else if (data.daysRemaining <= 30) {
        sslDays.className = 'result-value text-warning font-weight-bold';
      } else {
        sslDays.className = 'result-value text-success';
      }
    } else {
      sslDays.textContent = 'Unknown';
      sslDays.className = 'result-value';
    }
    
    // Show/hide error details
    if (data.error) {
      sslError.textContent = data.error;
      sslErrorContainer.style.display = '';
    } else {
      sslErrorContainer.style.display = 'none';
    }
    
    // Update security info if available
    if (data.securityInfo && (data.securityInfo.protocol || data.securityInfo.cipherSuite)) {
      sslProtocol.textContent = data.securityInfo.protocol || 'Unknown';
      sslCipher.textContent = data.securityInfo.cipherSuite || 'Unknown';
      sslSecurityInfo.style.display = '';
    } else {
      sslSecurityInfo.style.display = 'none';
    }
    
    // Update external validation links
    sslLabsLink.href = `https://www.ssllabs.com/ssltest/analyze.html?d=${data.domain}`;
    sslCheckerLink.href = `https://www.sslshopper.com/ssl-checker.html#hostname=${data.domain}`;
    
    // Generate and display recommendations
    displayRecommendations(data);
  }
  
  /**
   * Function to display an error when SSL check fails
   * @param {string} domain - The domain that was checked
   * @param {string} errorMessage - The error message
   */
  function displayError(domain, errorMessage) {
    // Set domain name
    resultDomain.textContent = domain;
    
    // Update status alert
    sslStatusAlert.textContent = 'Error checking certificate';
    sslStatusAlert.className = 'alert alert-danger';
    
    // Clear certificate details
    sslIssuer.textContent = 'Unknown';
    sslValidFrom.textContent = 'Unknown';
    sslValidTo.textContent = 'Unknown';
    sslDays.textContent = 'Unknown';
    sslDays.className = 'result-value';
    
    // Show error details
    sslError.textContent = errorMessage;
    sslErrorContainer.style.display = '';
    
    // Hide security info
    sslSecurityInfo.style.display = 'none';
    
    // Update external validation links
    sslLabsLink.href = `https://www.ssllabs.com/ssltest/analyze.html?d=${domain}`;
    sslCheckerLink.href = `https://www.sslshopper.com/ssl-checker.html#hostname=${domain}`;
    
    // Add error recommendation
    displayRecommendations({
      domain,
      valid: false,
      error: errorMessage
    });
  }
  
  /**
   * Function to generate and display recommendations based on SSL check results
   * @param {Object} data - The SSL check result data
   */
  function displayRecommendations(data) {
    // Clear previous recommendations
    recommendationsList.innerHTML = '';
    
    const recommendations = [];
    
    // Generate recommendations based on SSL check results
    if (!data.valid) {
      recommendations.push({
        severity: 'high',
        title: 'Invalid SSL Certificate',
        description: data.error || 'The SSL certificate for this domain is invalid.',
        action: 'Obtain a valid SSL certificate from a trusted certificate authority.'
      });
    } else {
      // Check certificate expiration
      if (data.daysRemaining <= 0) {
        recommendations.push({
          severity: 'critical',
          title: 'Expired SSL Certificate',
          description: 'The SSL certificate has expired.',
          action: 'Renew the SSL certificate immediately.'
        });
      } else if (data.daysRemaining <= 7) {
        recommendations.push({
          severity: 'high',
          title: 'SSL Certificate Expiring Very Soon',
          description: `The SSL certificate will expire in ${data.daysRemaining} days.`,
          action: 'Renew the SSL certificate immediately.'
        });
      } else if (data.daysRemaining <= 30) {
        recommendations.push({
          severity: 'medium',
          title: 'SSL Certificate Expiring Soon',
          description: `The SSL certificate will expire in ${data.daysRemaining} days.`,
          action: 'Plan to renew the SSL certificate soon.'
        });
      }
    }
    
    // If no recommendations, add a success message
    if (recommendations.length === 0 && data.valid) {
      recommendations.push({
        severity: 'success',
        title: 'SSL Certificate Valid',
        description: 'The SSL certificate is valid and not expiring soon.',
        action: 'No action needed at this time.'
      });
    }
    
    // Display recommendations
    recommendations.forEach(rec => {
      const recItem = document.createElement('div');
      recItem.className = `list-group-item list-group-item-${getSeverityClass(rec.severity)}`;
      
      recItem.innerHTML = `
        <h5 class="mb-1">${rec.title}</h5>
        <p class="mb-1">${rec.description}</p>
        <small><strong>Recommended Action:</strong> ${rec.action}</small>
      `;
      
      recommendationsList.appendChild(recItem);
    });
  }
  
  /**
   * Helper function to map severity to Bootstrap class
   * @param {string} severity - The severity level
   * @returns {string} - The corresponding Bootstrap class
   */
  function getSeverityClass(severity) {
    switch (severity) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      case 'success':
        return 'success';
      default:
        return 'info';
    }
  }
  
  /**
   * Helper function to format dates
   * @param {string} dateString - The date string to format
   * @returns {string} - The formatted date
   */
  function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  }
});