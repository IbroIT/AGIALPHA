import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);

  // Эффект при скролле (тень и скрытие)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Плавная прокрутка
  const smoothScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Меню
  const menuItems = [
    { key: 'who-we-are', label: 'Who We Are', section: 'who-we-are' },
    { key: 'what-we-build', label: 'What We Build', section: 'what-we-build' },
    { key: 'contact', label: 'Contact', section: 'contact' },
  ];

  const NavbarItem = ({ item }) => (
    <button
      onClick={() => smoothScrollTo(item.section)}
      className="group flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300"
    >
      <span className="relative">
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-500 group-hover:w-full" />
      </span>
    </button>
  );

  const MobileMenu = () => (
    <div className="lg:hidden bg-gradient-to-b from-blue-900/95 to-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <div className="px-4 py-6 space-y-4">
        {menuItems.map((item) => (
          <div key={item.key} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
            <button
              onClick={() => smoothScrollTo(item.section)}
              className="block w-full text-left px-4 py-4 rounded-xl text-lg font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        ))}

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={() => smoothScrollTo('contact')}
            className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl text-lg font-semibold text-center transition-all duration-500 transform hover:scale-105 shadow-2xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </div>

        <div className="pt-4 text-center text-blue-200 text-sm space-y-1">
          <div>info@agialpha.pro</div>
          <div>press@agialpha.pro</div>
        </div>
      </div>
    </div>
  );

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-blue-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900'
      }`}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <button onClick={() => smoothScrollTo('hero')} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
              AGI
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold leading-tight">AGI ALPHA</span>
              <span className="text-slate-300 text-xs font-medium">ANALYTICS CORP</span>
            </div>
          </button>

          {/* Десктопное меню */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <NavbarItem key={item.key} item={item} />
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => smoothScrollTo('contact')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>

          {/* Мобильное меню */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/90 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-all duration-500"
            >
              <div className="w-6 h-6 flex flex-col justify-center relative">
                <span
                  className={`absolute w-6 h-0.5 bg-current transition-all duration-500 ${
                    isOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-current transition-all duration-500 ${
                    isOpen ? 'opacity-0' : 'opacity-100 top-3'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-current transition-all duration-500 ${
                    isOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
