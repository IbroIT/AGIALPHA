import React, { useState } from 'react';
import Logo from '../assets/logo.jpg';

const Footer = () => {
  const [activeLegal, setActiveLegal] = useState(null);

  const currentYear = new Date().getFullYear();

  const legalPages = [
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms of Use' },
    { key: 'disclaimers', label: 'Disclaimers' }
  ];

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
            <img src={Logo} alt="Logo" className="w-10 h-10 rounded-md object-cover" />
            <div className="text-left">
              <span className="text-white text-lg font-semibold">AGI ALPHA</span>
              <span className="block text-slate-300 text-xs font-medium">ANALYTICS CORP</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {legalPages.map((page) => (
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
            <p>© {currentYear} AGI ALPHA ANALYTICS CORP. All Rights Reserved.</p>
            <p className="text-red-400/80 font-medium">
              AGI ALPHA ANALYTICS CORP is not a registered investment adviser, broker-dealer, or financial institution.
            </p>
            <p>
              All materials are provided strictly for educational, informational, and illustrative purposes only.
            </p>
            <p>
              Nothing on this website constitutes an offer to sell or a solicitation to buy any security or financial instrument.
            </p>
            <p>
              An offering, if any, can be made only through a confidential offering memorandum delivered to qualified investors.
            </p>
            <p className="font-semibold">
              Past performance is not a guarantee of future results.
            </p>
            <p className="text-amber-400/80">
              Investments involve risk, including the possible loss of principal.
            </p>
          </div>
        </div>

        {/* Legal Pages Content */}
        {activeLegal && (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-cyan-400/20 mb-6 animate-fadeIn">
            <div className="text-slate-300 text-sm leading-relaxed space-y-4 max-h-96 overflow-y-auto">
              {activeLegal === 'privacy' && (
                <>
                  <h3 className="text-white font-bold text-lg mb-4">Privacy Policy</h3>
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
                </>
              )}

              {activeLegal === 'terms' && (
                <>
                  <h3 className="text-white font-bold text-lg mb-4">Terms of Use</h3>
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
                </>
              )}

              {activeLegal === 'disclaimers' && (
                <>
                  <h3 className="text-white font-bold text-lg mb-4">Disclaimers</h3>
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
                </>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="text-center pt-6 border-t border-white/10">
          <p className="text-slate-500 text-xs">
            Turning Artificial Intelligence into Alpha
          </p>
        </div>
      </div>

      <style jsx>{`
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