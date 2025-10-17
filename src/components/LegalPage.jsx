// LegalPage.jsx - Reusable component for legal pages
import React, { useEffect, useRef } from 'react';

const LegalPage = ({ title, content, children }) => {
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
            {children || content}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
          >
            ← Back to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p>
      <strong>AGI ALPHA ANALYTICS CORP</strong> ("we," "our," or "us") respects your privacy.
    </p>
    
    <p>
      We collect limited information such as your name, email address, and company affiliation solely for communication and operational purposes.
    </p>
    
    <p>
      We do not sell, rent, or disclose personal data to third parties except as required by law or necessary to deliver our services (e.g., email hosting, analytics, or security).
    </p>
    
    <p>
      All information is stored securely and handled in compliance with applicable data protection regulations, including GDPR and CCPA principles.
    </p>
    
    <p>
      By using this website, you consent to the terms of this Privacy Policy.
    </p>
    
    <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
      <p className="text-sm text-slate-300">
        <strong>Last Updated:</strong> {new Date().getFullYear()}
      </p>
    </div>
  </LegalPage>
);

// Terms of Use Page
export const TermsOfUse = () => (
  <LegalPage title="Terms of Use">
    <p>
      By accessing or using this website, you agree to comply with these Terms of Use.
    </p>
    
    <p>
      All content, data visualizations, analytics, and intellectual property are owned by <strong>AGI ALPHA ANALYTICS CORP</strong> and provided for informational and educational purposes only.
    </p>
    
    <p>
      You may not copy, redistribute, or use any material for commercial purposes without prior written consent.
    </p>
    
    <p>
      We reserve the right to modify these Terms at any time, effective upon posting of the updated version on this website.
    </p>
    
    <p>
      Your continued use of the site constitutes acceptance of the revised Terms.
    </p>
    
    <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
      <p className="text-sm text-slate-300">
        <strong>Last Updated:</strong> {new Date().getFullYear()}
      </p>
    </div>
  </LegalPage>
);

// Disclaimers Page
export const Disclaimers = () => (
  <LegalPage title="Disclaimers">
    <p>
      <strong>AGI ALPHA ANALYTICS CORP</strong> is not a registered investment adviser, broker-dealer, or financial institution.
    </p>
    
    <p>
      All analytics, forecasts, and research published on this website are for educational and informational purposes only and do not constitute investment, legal, or financial advice.
    </p>
    
    <p>
      Nothing on this site should be relied upon for trading or investment decisions.
    </p>
    
    <p>
      Users are solely responsible for their financial actions.
    </p>
    
    <p>
      We make no representations or warranties, express or implied, regarding the completeness, accuracy, or timeliness of any information presented herein.
    </p>
    
    <p>
      Past performance is not indicative of future outcomes.
    </p>
    
    <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-lg">
      <p className="text-amber-300 font-semibold text-center">
        Investments involve risk, including the possible loss of principal.
      </p>
    </div>
  </LegalPage>
);

export default LegalPage;