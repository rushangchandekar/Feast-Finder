import React, { useState, useEffect } from 'react';
import Logo from '../images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './theme-provider';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#recipes', label: 'Explore' },
    { href: '/smartchef', label: '🤖 SmartChef', isSpecial: true },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const themeIcon = () => {
    if (theme === 'dark') return <FiMoon className="w-4 h-4" />;
    if (theme === 'light') return <FiSun className="w-4 h-4" />;
    return <FiMonitor className="w-4 h-4" />;
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-[hsl(220,20%,6%)]/85 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="flex w-full py-3 md:py-4 px-5 md:px-12 lg:px-20 items-center justify-between max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={Logo}
            alt="FeastFinder Logo"
            className="h-8 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith('/#') ? (
                <a
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    link.isSpecial
                      ? `${scrolled ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-300'} hover:bg-emerald-500/10`
                      : isActive(link.href)
                        ? `${scrolled ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10' : 'text-white bg-white/15'}`
                        : `${scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' : 'text-white/80 hover:text-white'} hover:bg-white/10`
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    link.isSpecial
                      ? `${scrolled ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-300'} hover:bg-emerald-500/10`
                      : isActive(link.href)
                        ? `${scrolled ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10' : 'text-white bg-white/15'}`
                        : `${scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' : 'text-white/80 hover:text-white'} hover:bg-white/10`
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side: Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            aria-label={`Current theme: ${theme}. Click to cycle.`}
          >
            {themeIcon()}
          </button>

          {/* Sign In button */}
          <button
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105'
                : 'border border-white/30 text-white hover:bg-white/15 backdrop-blur-sm'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={cycleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-white/80'
            }`}
            aria-label="Toggle theme"
          >
            {themeIcon()}
          </button>
          <button
            className={`p-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'text-gray-900 dark:text-white'
                : 'text-white'
            }`}
            onClick={() => setOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <AiOutlineClose size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-[56px] z-40 transition-all duration-400 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)} 
        />

        {/* Menu panel */}
        <div className={`relative bg-white dark:bg-[hsl(220,20%,8%)] border-b border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}>
          <div className="flex flex-col px-6 py-6 gap-1">
            {navLinks.map((link, index) => (
              <div 
                key={link.href} 
                className={`animate-slideDown`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      link.isSpecial
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      link.isSpecial
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                        : isActive(link.href)
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-md">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
