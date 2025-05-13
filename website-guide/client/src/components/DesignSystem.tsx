import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Copy, Check, Eye, EyeOff, 
  ChevronDown, ChevronUp, Download, Code 
} from 'lucide-react';
import { feedback } from './FeedbackSystem';

// Define color palette
const colorPalette = {
  primary: {
    50: '#f0f1fe',
    100: '#e2e3fd',
    200: '#c5c8fa',
    300: '#a8acf8',
    400: '#8a8ff5',
    500: '#6d73f3',
    600: '#5458d1',
    700: '#3c3fa9',
    800: '#252782',
    900: '#0d0e5b',
  },
  gray: {
    50: '#f9fafb',
    100: '#f4f5f7',
    200: '#e5e7eb',
    300: '#d2d6dc',
    400: '#9fa6b2',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

// Typography definitions
const typography = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing definitions
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// Border radius definitions
const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Shadow definitions
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Generate Tailwind CSS config for colors
const generateTailwindColors = () => {
  let result = '{\n';
  
  Object.entries(colorPalette).forEach(([colorName, shades]) => {
    result += `  ${colorName}: {\n`;
    
    Object.entries(shades).forEach(([shade, value]) => {
      result += `    '${shade}': '${value}',\n`;
    });
    
    result += '  },\n';
  });
  
  result += '}';
  return result;
};

// Copy to clipboard function
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      feedback.success('Copied to clipboard!');
    })
    .catch(() => {
      feedback.error('Failed to copy to clipboard');
    });
};

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState<string | null>('colors');
  const [showCSSVariables, setShowCSSVariables] = useState(false);
  
  // Toggle section visibility
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };
  
  // Generate CSS variables for the color palette
  const generateCSSVariables = () => {
    let result = ':root {\n';
    
    Object.entries(colorPalette).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        result += `  --${colorName}-${shade}: ${value};\n`;
      });
    });
    
    result += '}\n\n';
    
    // Add dark mode variables
    result += '.dark {\n';
    
    // In dark mode, we could invert some colors or adjust them
    // This is a simple example, in a real design system you might have specific dark mode colors
    result += '  /* Dark mode specific variables */\n';
    result += '  --background: #1f2937;\n';
    result += '  --foreground: #f9fafb;\n';
    result += '}\n';
    
    return result;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <Palette className="mr-2 h-6 w-6 text-primary" />
          Shared Design System
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This design system provides a consistent visual language to be shared across all Node12.com projects, including the main website and the bookmark converter.
        </p>
        
        {/* Color Palette Section */}
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 focus:outline-none"
            onClick={() => toggleSection('colors')}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Color Palette</h3>
            {activeSection === 'colors' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'colors' && (
            <div className="p-4">
              <div className="mb-4 flex justify-between items-center">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Primary Colors</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCSSVariables(!showCSSVariables)}
                    className="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"
                  >
                    {showCSSVariables ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                    {showCSSVariables ? 'Show HEX' : 'Show CSS Vars'}
                  </button>
                  <button
                    onClick={() => copyToClipboard(showCSSVariables ? generateCSSVariables() : generateTailwindColors())}
                    className="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy {showCSSVariables ? 'CSS' : 'Config'}
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob(
                        [showCSSVariables ? generateCSSVariables() : generateTailwindColors()], 
                        { type: 'text/plain' }
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = showCSSVariables ? 'node12-colors.css' : 'node12-colors.js';
                      a.click();
                      URL.revokeObjectURL(url);
                      feedback.success('Color definition downloaded!');
                    }}
                    className="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </button>
                </div>
              </div>
              
              {/* Color swatches */}
              <div className="space-y-6">
                {Object.entries(colorPalette).map(([colorName, shades]) => (
                  <div key={colorName}>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 capitalize mb-2">{colorName}</h5>
                    <div className="grid grid-cols-10 gap-2">
                      {Object.entries(shades).map(([shade, value]) => (
                        <div 
                          key={`${colorName}-${shade}`}
                          className="flex flex-col"
                          onClick={() => {
                            copyToClipboard(showCSSVariables ? `var(--${colorName}-${shade})` : value);
                          }}
                        >
                          <div 
                            className="h-12 rounded-md cursor-pointer flex items-center justify-center transition-transform hover:scale-105"
                            style={{ backgroundColor: value }}
                          >
                            <span className={`text-xs font-medium ${parseInt(shade) > 400 ? 'text-white' : 'text-gray-900'}`}>
                              {shade}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                            {showCSSVariables 
                              ? `--${colorName}-${shade}`
                              : value
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CSS Variables Preview */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {showCSSVariables ? 'CSS Variables' : 'Tailwind Config'}
                </h4>
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-xs text-gray-800 dark:text-gray-300 overflow-x-auto">
                  <code>
                    {showCSSVariables 
                      ? generateCSSVariables()
                      : generateTailwindColors()
                    }
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
        
        {/* Typography Section */}
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 focus:outline-none"
            onClick={() => toggleSection('typography')}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Typography</h3>
            {activeSection === 'typography' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'typography' && (
            <div className="p-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Font Families</h4>
                  <div className="space-y-4">
                    {Object.entries(typography.fontFamily).map(([name, value]) => (
                      <div key={name} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">font-{name}</span>
                          <p style={{ fontFamily: value }} className="text-gray-900 dark:text-gray-100">
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(`font-family: ${value};`)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Font Sizes</h4>
                  <div className="space-y-4">
                    {Object.entries(typography.fontSize).map(([name, value]) => (
                      <div key={name} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">text-{name} ({value})</span>
                          <p style={{ fontSize: value }} className="text-gray-900 dark:text-gray-100 truncate">
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(`font-size: ${value};`)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Font Weights</h4>
                  <div className="space-y-4">
                    {Object.entries(typography.fontWeight).map(([name, value]) => (
                      <div key={name} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">font-{name} ({value})</span>
                          <p style={{ fontWeight: value }} className="text-gray-900 dark:text-gray-100">
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(`font-weight: ${value};`)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Spacing Section */}
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 focus:outline-none"
            onClick={() => toggleSection('spacing')}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Spacing</h3>
            {activeSection === 'spacing' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'spacing' && (
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(spacing).map(([name, value]) => (
                  <div key={name} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div 
                      className="w-12 h-12 bg-primary-500 rounded-md mr-3 flex-shrink-0"
                      style={{ width: value, height: value }}
                    />
                    <div className="flex-1">
                      <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">{name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Border Radius Section */}
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 focus:outline-none"
            onClick={() => toggleSection('borderRadius')}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Border Radius</h3>
            {activeSection === 'borderRadius' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'borderRadius' && (
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(borderRadius).map(([name, value]) => (
                  <div key={name} className="text-center">
                    <div 
                      className="w-16 h-16 bg-primary-500 mx-auto mb-2"
                      style={{ borderRadius: value }}
                    />
                    <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                      {name === 'DEFAULT' ? 'rounded' : `rounded-${name}`}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Shadows Section */}
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 focus:outline-none"
            onClick={() => toggleSection('shadows')}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Shadows</h3>
            {activeSection === 'shadows' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'shadows' && (
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(shadows).map(([name, value]) => (
                  <div key={name} className="text-center" onClick={() => copyToClipboard(`box-shadow: ${value};`)}>
                    <div 
                      className="w-24 h-24 bg-white dark:bg-gray-700 mx-auto mb-3 cursor-pointer transition-transform hover:scale-105"
                      style={{ boxShadow: value }}
                    />
                    <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                      {name === 'DEFAULT' ? 'shadow' : `shadow-${name}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Implementation Instructions</h3>
              <p className="text-gray-600 dark:text-gray-400">To use this design system in other projects:</p>
            </div>
            <button 
              onClick={() => {
                const instructions = `
# Node12.com Design System Implementation

To implement this shared design system across your projects:

## 1. Install tailwindcss and dependencies

\`\`\`bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## 2. Configure Tailwind

Add this to your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: ${generateTailwindColors()}
    }
  },
  plugins: [],
}
\`\`\`

## 3. Add CSS Variables (Optional)

Create a file called \`design-system.css\`:

\`\`\`css
${generateCSSVariables()}
\`\`\`

## 4. Import in your application

Import the CSS variables in your main CSS file:

\`\`\`css
@import './design-system.css';
\`\`\`

## 5. Use in your components

Now you can use these design tokens in your components:

\`\`\`jsx
function Button({ children }) {
  return (
    <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded shadow">
      {children}
    </button>
  );
}
\`\`\`
`;
                copyToClipboard(instructions);
              }}
              className="inline-flex items-center px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              <Code className="h-4 w-4 mr-1" />
              Copy Instructions
            </button>
          </div>
          
          <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Use the Tailwind configuration to extend your existing theme</li>
            <li>Implement the CSS variables for non-Tailwind projects</li>
            <li>Copy color, typography, spacing, and other values as needed</li>
            <li>Ensure that all Node12.com projects adhere to this design system</li>
          </ul>
        </div>
      </div>
    </div>
  );
}