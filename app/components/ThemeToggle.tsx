'use client';

import { useState, useEffect, useRef } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      observer.disconnect();
    };
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  if (!mounted) {
    return null;
  }

  const getThemeText = (t: Theme) => {
    switch (t) {
      case 'system': return 'System';
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      default: return 'System';
    }
  };

  const getThemeIcon = (t: Theme) => {
    switch (t) {
      case 'system':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'light':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`backdrop-blur-xl border rounded-full px-4 py-2 shadow-lg cursor-pointer flex items-center ${isDark ? 'bg-gray-700 border-white/20' : 'bg-white/20 border-white/30'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {getThemeIcon(theme)}
        <span className={`text-sm ml-2 mr-3 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          {getThemeText(theme)}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute top-full mt-2 min-w-32 backdrop-blur-2xl border rounded-2xl shadow-2xl overflow-hidden z-50"
          style={{
            backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgb(209, 213, 219)'
          }}
        >
          <div
            className="px-6 py-4 text-sm font-medium cursor-pointer transition-all duration-200 flex items-center space-x-4 rounded-2xl relative"
            style={{
              backgroundColor: hoveredOption === 'system'
                ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgb(209, 213, 219)')
                : '',
              color: isDark ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)'
            }}
            onClick={() => handleThemeChange('system')}
            onMouseEnter={() => setHoveredOption('system')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>System</span>
          </div>
          <div
            className="px-6 py-4 text-sm font-medium cursor-pointer transition-all duration-200 flex items-center space-x-4 rounded-2xl relative"
            style={{
              backgroundColor: hoveredOption === 'light'
                ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgb(209, 213, 219)')
                : '',
              color: isDark ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)'
            }}
            onClick={() => handleThemeChange('light')}
            onMouseEnter={() => setHoveredOption('light')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Light</span>
          </div>
          <div
            className="px-6 py-4 text-sm font-medium cursor-pointer transition-all duration-200 flex items-center space-x-4 rounded-2xl relative"
            style={{
              backgroundColor: hoveredOption === 'dark'
                ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgb(209, 213, 219)')
                : '',
              color: isDark ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)'
            }}
            onClick={() => handleThemeChange('dark')}
            onMouseEnter={() => setHoveredOption('dark')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>Dark</span>
          </div>
        </div>
      )}
    </div>
  );
}