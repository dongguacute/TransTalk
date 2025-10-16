'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Footer() {
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
    <footer className={`py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/icon.svg"
                alt="TransTalk Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                TransTalk
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              A warm community platform designed for the transgender community, providing information sharing,
              story sharing, and professional support resources. We believe every story deserves to be heard,
              and every identity deserves to be respected.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com/dongguacute" className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://x.com/Dongguacute" className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={`text-sm hover:text-blue-500 transition-colors duration-200 flex items-center group ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={`text-sm hover:text-blue-500 transition-colors duration-200 flex items-center group ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`text-sm hover:text-blue-500 transition-colors duration-200 flex items-center group ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Support Resources
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`text-sm hover:text-pink-500 transition-colors duration-200 flex items-center group ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Support Hotline
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm hover:text-pink-500 transition-colors duration-200 flex items-center group ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Medical Resources
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm hover:text-pink-500 transition-colors duration-200 flex items-center group ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Legal Aid
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} TransTalk. Made with ❤️ for the transgender community.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className={`text-sm hover:text-blue-500 transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm hover:text-blue-500 transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm hover:text-pink-500 transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Community Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}