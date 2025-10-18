import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo.jpg';

const Footer = () => {
  const { t } = useTranslation();
  const [activeLegal, setActiveLegal] = useState(null);

  const currentYear = new Date().getFullYear();

  // Безопасное получение страниц
  const legalPages = t('footer.legalPages', { returnObjects: true }) || [];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src={Logo} alt={t('footer.logoAlt')} className="w-10 h-10 rounded-md object-cover" />
            <div className="text-left">
              <span className="text-white text-lg font-semibold">{t('footer.companyName.line1')}</span>
              <span className="block text-slate-300 text-xs font-medium">{t('footer.companyName.line2')}</span>
            </div>
          </div>

          {/* Legal buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {Array.isArray(legalPages) &&
              legalPages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => setActiveLegal(activeLegal === page.key ? null : page.key)}
                  className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-300"
                >
                  {page.label}
                </button>
              ))}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
          <div className="text-center text-slate-400 text-xs leading-relaxed space-y-2">
            <p>{t('footer.copyright', { year: currentYear })}</p>
            <p className="text-red-400/80 font-medium">{t('footer.disclaimer.notRegistered')}</p>
            <p>{t('footer.disclaimer.educationalPurpose')}</p>
            <p>{t('footer.disclaimer.noOffer')}</p>
            <p>{t('footer.disclaimer.confidentialOffering')}</p>
            <p className="font-semibold">{t('footer.disclaimer.pastPerformance')}</p>
            <p className="text-amber-400/80">{t('footer.disclaimer.investmentRisk')}</p>
          </div>
        </div>

        {/* Legal Pages Content */}
        {activeLegal && (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-cyan-400/20 mb-6 animate-fadeIn">
            <div className="text-slate-300 text-sm leading-relaxed space-y-4 max-h-96 overflow-y-auto">
              {activeLegal === 'privacy' && (
                <>
                  <h3 className="text-white font-bold text-lg mb-4">{t('footer.legal.privacy.title')}</h3>
                  {(t('footer.legal.privacy.content', { returnObjects: true }) || []).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </>
              )}

              {activeLegal === 'terms' && (
                <>
                  <h3 className="text-white font-bold text-lg mb-4">{t('footer.legal.terms.title')}</h3>
                  {(t('footer.legal.terms.content', { returnObjects: true }) || []).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </>
              )}

              {activeLegal === 'disclaimers' && (
                <>
                  <h3 className="text-white font-bold text-lg mb-4">{t('footer.legal.disclaimers.title')}</h3>
                  {(t('footer.legal.disclaimers.content', { returnObjects: true }) || []).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="text-center pt-6 border-t border-white/10">
          <p className="text-slate-500 text-xs">{t('footer.tagline')}</p>
        </div>
      </div>

      {/* ✅ Исправлено — без jsx */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
