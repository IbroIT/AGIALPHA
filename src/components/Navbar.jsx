import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo.jpg';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  // Закрытие меню при клике вне области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          navbarRef.current && 
          !navbarRef.current.contains(event.target) &&
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      className="flex items-center justify-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px] whitespace-nowrap group touch-manipulation"
    >
      <span className="relative py-1">
        {item.label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
      </span>
    </button>
  );

  const MobileMenu = ({ menuItems, smoothScrollTo, onClose }) => {
    const handleItemClick = (sectionId) => {
      smoothScrollTo(sectionId);
      onClose();
    };

    return (
      <>
        {/* Фон оверлей */}
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Контент меню */}
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed top-16 left-0 right-0 z-50 transform transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        >
          <div 
            className="max-h-[calc(100vh-4rem)] overflow-y-auto bg-gradient-to-b from-blue-900/98 to-slate-900/98 border-t border-white/10 shadow-2xl rounded-t-2xl mx-4 p-4 space-y-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.section)}
                className="flex items-center justify-between w-full text-left px-4 py-4 rounded-xl text-base font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 active:bg-white/10 touch-manipulation"
                style={{ minHeight: '52px' }}
              >
                <span>{item.label}</span>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => handleItemClick('contact')}
                className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
                style={{ minHeight: '56px' }}
              >
                {t('navbar.cta.getStarted')}
              </button>
            </div>

            <MobileLanguageSwitcher onClose={onClose} />
          </div>
        </div>
      </>
    );
  };

  const HamburgerButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden flex items-center justify-center text-white/90 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-all duration-300 min-h-[48px] min-w-[48px] touch-manipulation active:bg-white/10"
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
    <>
      <nav
        ref={navbarRef}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-blue-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900'
        }`}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Логотип */}
            <button 
              onClick={() => smoothScrollTo('hero')} 
              className="flex items-center space-x-3 flex-shrink-0 hover:opacity-90 transition-opacity duration-300 min-h-[44px] touch-manipulation"
            >
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-md object-cover flex-shrink-0" 
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-white text-sm sm:text-base lg:text-lg font-semibold whitespace-nowrap">
                  {t('navbar.brand.name')}
                </span>
                <span className="text-slate-300 text-xs font-medium whitespace-nowrap hidden sm:block">
                  {t('navbar.brand.subtitle')}
                </span>
              </div>
            </button>

            {/* Десктопное меню */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-4 xl:mx-8">
              <div className="flex items-center space-x-1 xl:space-x-2">
                {menuItems.map((item) => (
                  <NavbarItem key={item.key} item={item} />
                ))}
              </div>
            </div>

            {/* Правая часть - CTA и языковой переключатель */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
              <LanguageSwitcher />
              <button
                onClick={() => smoothScrollTo('contact')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 xl:px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap min-h-[44px] touch-manipulation"
              >
                {t('navbar.cta.getStarted')}
              </button>
            </div>

            {/* Мобильное меню */}
            <div className="lg:hidden flex items-center">
              <HamburgerButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Мобильное меню контент */}
      {isOpen && (
        <MobileMenu
          menuItems={menuItems}
          smoothScrollTo={smoothScrollTo}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

// Language Switcher Components
import flagEn from '../assets/flags/united-kingdom-uk-svgrepo-com.svg';
import flagRu from '../assets/flags/flag-ru-svgrepo-com.svg';
import flagAr from '../assets/flags/world.png';

const flagImages = {
  en: flagEn,
  ru: flagRu,
  ar: flagAr
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: 'en' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'ar', name: 'العربية', flag: 'ar' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    if (languageCode === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = languageCode;
    }
  };

  const FlagImage = ({ code, className = "w-5 h-5" }) => (
    <img 
      src={flagImages[code]} 
      alt="" 
      className={`${className} object-cover rounded-sm`}
    />
  );

  return (
    <div className="relative language-switcher" ref={switcherRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/20 min-h-[44px] touch-manipulation"
        aria-label="Switch language"
      >
        <FlagImage code={currentLanguage.flag} />
        <span className="hidden sm:block">{currentLanguage.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-blue-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-200 ${
                currentLanguage.code === language.code
                  ? 'bg-blue-600 text-white'
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              } touch-manipulation`}
            >
              <FlagImage code={language.flag} />
              <span className="font-medium">{language.name}</span>
              {currentLanguage.code === language.code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileLanguageSwitcher = ({ onClose }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: 'en' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'ar', name: 'العربية', flag: 'ar' }
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    
    if (languageCode === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = languageCode;
    }
    
    if (onClose) onClose();
  };

  const FlagImage = ({ code, className = "w-7 h-7" }) => (
    <img 
      src={flagImages[code]} 
      alt="" 
      className={`${className} object-cover rounded-sm`}
    />
  );

  return (
    <div className="border-t border-white/10 pt-4">
      <div className="space-y-3">
        <div className="text-blue-200 text-base font-medium mb-3 px-2">Language / Язык / اللغة</div>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-left transition-all duration-200 ${
              i18n.language === language.code
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-white/90 hover:text-white hover:bg-white/5'
            } touch-manipulation active:scale-98`}
          >
            <FlagImage code={language.flag} className="w-7 h-7" />
            <span className="font-medium text-lg flex-1">{language.name}</span>
            {i18n.language === language.code && (
              <svg className="w-6 h-6 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;