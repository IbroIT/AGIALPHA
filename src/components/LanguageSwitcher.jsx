import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Импортируем PNG иконки флагов
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

  const languages = [
    { code: 'en', name: 'English', flag: 'en' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'ar', name: 'العربية', flag: 'ar' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Для арабского языка меняем направление текста
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
    <div className="relative">
      {/* Кнопка переключателя */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/20"
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

      {/* Выпадающее меню */}
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
              }`}
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

      {/* Overlay для закрытия при клике вне компонента */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
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
    
    // Для арабского языка меняем направление текста
    if (languageCode === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = languageCode;
    }
    
    if (onClose) onClose();
  };

  const FlagImage = ({ code, className = "w-5 h-5" }) => (
    <img 
      src={flagImages[code]} 
      alt="" 
      className={`${className} object-cover rounded-sm`}
    />
  );

  return (
    <div className="border-t border-white/10 pt-4">
      <div className="px-4 space-y-2">
        <div className="text-blue-200 text-sm font-medium mb-2">Language / Язык / اللغة</div>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              i18n.language === language.code
                ? 'bg-blue-600 text-white'
                : 'text-white/90 hover:text-white hover:bg-white/5'
            }`}
          >
            <FlagImage code={language.flag} />
            <span className="font-medium">{language.name}</span>
            {i18n.language === language.code && (
              <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export { MobileLanguageSwitcher };
export default LanguageSwitcher;