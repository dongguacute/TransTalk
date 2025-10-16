'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname === '/' ? 'home' : 'articles');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          {/* Left oval switcher */}
          <div className="absolute left-0 flex items-center">
            <div className="flex-shrink-0">
              <div className={`backdrop-blur-xl rounded-full p-1 flex items-center border shadow-lg relative ${isDark ? 'bg-gray-700 border-white/20' : 'bg-white/20 border-white/30'}`}>
                {hoveredTab && hoveredTab !== activeTab && (
                  <div
                    className="absolute inset-1 rounded-full transition-all duration-200"
                    style={{
                      width: hoveredTab === 'home' ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                      left: hoveredTab === 'home' ? '4px' : 'calc(50% + 2px)',
                      backgroundColor: isDark ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                    }}
                  ></div>
                )}
                <button
                  onClick={() => setActiveTab('home')}
                  onMouseEnter={() => setHoveredTab('home')}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-200 relative rounded-full z-10 ${
                    activeTab === 'home'
                      ? 'text-white bg-[#55CDFC]'
                      : ''
                  }`}
                  style={{
                    color: activeTab === 'home' ? '' : (isDark ? 'rgb(255, 255, 255)' : 'rgb(55, 65, 81)')
                  }}
                >
                  TransTalk
                </button>
                <button
                  onClick={() => setActiveTab('articles')}
                  onMouseEnter={() => setHoveredTab('articles')}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-200 relative rounded-full z-10 ${
                    activeTab === 'articles'
                      ? 'text-white bg-[#55CDFC]'
                      : ''
                  }`}
                  style={{
                    color: activeTab === 'articles' ? '' : (isDark ? 'rgb(255, 255, 255)' : 'rgb(55, 65, 81)')
                  }}
                >
                  Articles
                </button>
              </div>
            </div>
          </div>

          {/* Middle search box */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right theme toggle */}
          <div className="absolute right-0 flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}