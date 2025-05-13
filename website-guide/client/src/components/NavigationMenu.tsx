import { useEffect, useState } from 'react';

export default function NavigationMenu() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'SSL', href: '/ssl' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Design System', href: '/design-system' },
    { name: 'Test', href: '/test' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-2 px-4">
      <nav className="flex flex-wrap gap-4 justify-center mb-4">
        {navigation.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-white/90 hover:text-white'
              }`}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
      
      <div className="text-center text-xs text-white/70 pb-1">
        Current path: {currentPath}
      </div>
    </div>
  );
}