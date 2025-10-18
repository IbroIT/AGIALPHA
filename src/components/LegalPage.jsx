// LegalPage.jsx - Reusable component for legal pages
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const LegalPage = ({ title, contentKey, children }) => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
          <div className="text-slate-200 leading-relaxed space-y-6">
            {children || (
              <>
                {t(`${contentKey}.content`, { returnObjects: true }).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                
                {/* Last Updated Section */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-slate-300">
                    <strong>{t('legal.lastUpdated')}</strong> {new Date().getFullYear()}
                  </p>
                </div>

                {/* Warning Section for Disclaimers */}
                {contentKey === 'disclaimers' && (
                  <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-amber-300 font-semibold text-center">
                      {t('legal.disclaimers.warning')}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
          >
            {t('legal.backButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
export const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <LegalPage 
      title={t('legal.privacy.title')} 
      contentKey="legal.privacy"
    />
  );
};

// Terms of Use Page
export const TermsOfUse = () => {
  const { t } = useTranslation();
  return (
    <LegalPage 
      title={t('legal.terms.title')} 
      contentKey="legal.terms"
    />
  );
};

// Disclaimers Page
export const Disclaimers = () => {
  const { t } = useTranslation();
  return (
    <LegalPage 
      title={t('legal.disclaimers.title')} 
      contentKey="legal.disclaimers"
    />
  );
};

export default LegalPage;