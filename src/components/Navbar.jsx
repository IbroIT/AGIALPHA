import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo.jpg';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import MobileLanguageSwitcher from './LanguageSwitcher.jsx';

const Navbar = () => {
  const { t } = useTranslation();
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

  // Меню из переводов
  const menuItems = [
    { key: 'who-we-are', label: t('navbar.menu.about'), section: 'who-we-are' },
    { key: 'what-we-build', label: t('navbar.menu.whatWeBuild'), section: 'what-we-build' },
    { key: 'contact', label: t('navbar.menu.contact'), section: 'contact' },
  ];

  const NavbarItem = ({ item }) => (
    <button
      onClick={() => smoothScrollTo(item.section)}
      className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px] min-w-[44px]"
    >
      <span className="relative py-1">
        {item.label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
      </span>
    </button>
  );

  const MobileNavItem = ({ item }) => (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => smoothScrollTo(item.section)}
        className="flex items-center justify-between w-full text-left px-4 py-4 rounded-xl text-base font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[52px]"
      >
        <span>{item.label}</span>
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  const MobileMenu = () => (
    <div className="lg:hidden bg-gradient-to-b from-blue-900/95 to-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <div className="px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <MobileNavItem key={item.key} item={item} />
        ))}

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => smoothScrollTo('contact')}
            className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 min-h-[52px] shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{t('navbar.cta.getStarted')}</span>
              <svg
                className="w-5 h-5 flex-shrink-0"
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
          <div className="leading-relaxed">{t('navbar.contact.infoEmail')}</div>
          <div className="leading-relaxed">{t('navbar.contact.pressEmail')}</div>
        </div>
        
        <div className="pt-4">
          <MobileLanguageSwitcher onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );

  const HamburgerButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden flex items-center justify-center text-white/90 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all duration-300 min-h-[44px] min-w-[44px]"
      aria-label={isOpen ? t('navbar.aria.closeMenu') : t('navbar.aria.openMenu')}
    >
      <div className="relative w-6 h-6">
        <span
          className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? 'rotate-45 top-3' : 'top-2'
          }`}
        />
        <span
          className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? 'opacity-0 top-3' : 'opacity-100 top-3'
          }`}
        />
        <span
          className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? '-rotate-45 top-3' : 'top-4'
          }`}
        />
      </div>
    </button>
  );

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-blue-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <button 
            onClick={() => smoothScrollTo('hero')} 
            className="flex items-center space-x-3 flex-shrink-0 hover:opacity-90 transition-opacity duration-300 min-h-[44px]"
          >
            <img 
              src={Logo} 
              alt="Logo" 
              className="w-10 h-10 rounded-md object-cover flex-shrink-0" 
            />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-white text-lg font-semibold whitespace-nowrap">
                {t('navbar.brand.name')}
              </span>
              <span className="text-slate-300 text-xs font-medium whitespace-nowrap">
                {t('navbar.brand.subtitle')}
              </span>
            </div>
          </button>

          {/* Десктопное меню */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <NavbarItem key={item.key} item={item} />
              ))}
            </div>
          </div>

          {/* Правая часть - CTA и языковой переключатель */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => smoothScrollTo('contact')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap min-h-[44px]"
            >
              {t('navbar.cta.getStarted')}
            </button>
          </div>

          {/* Мобильное меню */}
          <div className="lg:hidden flex items-center">
            <HamburgerButton />
          </div>
        </div>

        {/* Мобильное меню контент */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;