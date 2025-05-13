// Add the navigation bar to the page
document.addEventListener('DOMContentLoaded', function() {
  // Create the navigation container
  const nav = document.createElement('div');
  nav.className = 'nav-container';
  
  // Create the title
  const title = document.createElement('div');
  title.className = 'nav-title';
  title.textContent = 'Node12.com Project Separation';
  nav.appendChild(title);
  
  // Create the links container
  const linksContainer = document.createElement('div');
  linksContainer.className = 'nav-links';
  
  // Define the navigation links
  const links = [
    { text: 'Home', url: '/' },
    { text: 'SSL', url: '/ssl' },
    { text: 'Analytics', url: '/analytics' },
    { text: 'Design System', url: '/design-system' },
    { text: 'Admin', url: '/admin' },
    { text: 'Bookmark Converter', url: 'https://bookmarkconverter.replit.app', external: true }
  ];
  
  // Get the current path
  const currentPath = window.location.pathname;
  
  // Create each link
  links.forEach(link => {
    const a = document.createElement('a');
    a.className = 'nav-link ' + (currentPath === link.url ? 'active' : '');
    a.href = link.url;
    a.textContent = link.text;
    
    if (link.external) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    
    linksContainer.appendChild(a);
  });
  
  nav.appendChild(linksContainer);
  
  // Insert the navigation at the top of the body
  const body = document.body;
  body.insertBefore(nav, body.firstChild);
});