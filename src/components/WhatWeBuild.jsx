import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const WhatWeBuild = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Анимация появления при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Эффект параллакса
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Анимированный фон
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 25;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = `rgba(96, 165, 250, ${Math.random() * 0.15 + 0.08})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const products = [
    {
      name: t('whatWeBuild.products.aiTrading.name'),
      description: t('whatWeBuild.products.aiTrading.description'),
      icon: '🧠',
      features: [
        t('whatWeBuild.products.aiTrading.features.neuralNetworks'),
        t('whatWeBuild.products.aiTrading.features.statisticalModels'),
        t('whatWeBuild.products.aiTrading.features.quantitativeMethods')
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: t('whatWeBuild.products.gexAnalytics.name'),
      description: t('whatWeBuild.products.gexAnalytics.description'),
      icon: '📊',
      features: [
        t('whatWeBuild.products.gexAnalytics.features.dealerPositioning'),
        t('whatWeBuild.products.gexAnalytics.features.volatilityBuckets'),
        t('whatWeBuild.products.gexAnalytics.features.gammaExposure')
      ],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      name: t('whatWeBuild.products.institutionalDashboard.name'),
      description: t('whatWeBuild.products.institutionalDashboard.description'),
      icon: '⚡',
      features: [
        t('whatWeBuild.products.institutionalDashboard.features.riskAssessment'),
        t('whatWeBuild.products.institutionalDashboard.features.alphaDiscovery'),
        t('whatWeBuild.products.institutionalDashboard.features.multiFactorAnalysis')
      ],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: t('whatWeBuild.products.macroAIScanner.name'),
      description: t('whatWeBuild.products.macroAIScanner.description'),
      icon: '🔍',
      features: [
        t('whatWeBuild.products.macroAIScanner.features.macroData'),
        t('whatWeBuild.products.macroAIScanner.features.newsSentiment'),
        t('whatWeBuild.products.macroAIScanner.features.marketTone')
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const professionalFeatures = [
    {
      icon: '🏛️',
      title: t('whatWeBuild.professionalFeatures.institutionalData.title'),
      description: t('whatWeBuild.professionalFeatures.institutionalData.description')
    },
    {
      icon: '🔄',
      title: t('whatWeBuild.professionalFeatures.deepIntegration.title'),
      description: t('whatWeBuild.professionalFeatures.deepIntegration.description')
    },
    {
      icon: '🎯',
      title: t('whatWeBuild.professionalFeatures.provenAccuracy.title'),
      description: t('whatWeBuild.professionalFeatures.provenAccuracy.description')
    }
  ];

  return (
    <div id='what-we-build'
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] py-20"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1e40af 0%, #1e3a8a 50%, #1e1b4b 100%)`
      }}
    >
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-25"
      />

      {/* Floating Elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('whatWeBuild.title.main')} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('whatWeBuild.title.highlight')}</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {t('whatWeBuild.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {products.map((product, index) => (
            <div
              key={index}
              className={`group relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                activeProduct === index ? 'border-cyan-400/50 bg-white/15' : ''
              }`}
              onMouseEnter={() => setActiveProduct(index)}
              onClick={() => setActiveProduct(index)}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                activeProduct === index ? 'opacity-10' : ''
              }`} />
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl">{product.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="text-blue-100 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-white/10 rounded-full text-blue-200 text-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Indicator */}
              {activeProduct === index && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              )}
            </div>
          ))}
        </div>

        {/* Built for Professionals Section */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Left Side - Title and Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('whatWeBuild.professionalSection.title.main')} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('whatWeBuild.professionalSection.title.highlight')}</span>
              </h2>
              
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6" />
            </div>

            <div className="space-y-6">
              {professionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 group cursor-pointer transition-all duration-300 transform hover:translate-x-2"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-blue-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-30" />
            
            <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              {/* Data Flow Visualization */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white font-medium">{t('whatWeBuild.dataFlow.marketData')}</span>
                  </div>
                  <div className="text-cyan-400 text-sm">{t('whatWeBuild.dataFlow.realTime')}</div>
                </div>
                
                <div className="relative">
                  <div className="h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full" />
                  <div className="absolute inset-0 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-white font-medium">{t('whatWeBuild.dataFlow.aiProcessing')}</span>
                  </div>
                  <div className="text-cyan-400 text-sm">{t('whatWeBuild.dataFlow.analyzing')}</div>
                </div>
                
                <div className="relative">
                  <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
                  <div className="absolute inset-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-500" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-white font-medium">{t('whatWeBuild.dataFlow.insights')}</span>
                  </div>
                  <div className="text-cyan-400 text-sm">{t('whatWeBuild.dataFlow.actionable')}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                  <div className="text-blue-200 text-sm">{t('whatWeBuild.stats.uptime')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">50ms</div>
                  <div className="text-blue-200 text-sm">{t('whatWeBuild.stats.latency')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">24/7</div>
                  <div className="text-blue-200 text-sm">{t('whatWeBuild.stats.monitoring')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              {t('whatWeBuild.cta.title')}
            </h3>
            <p className="text-blue-200 text-lg mb-6">
              {t('whatWeBuild.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">{t('whatWeBuild.cta.demoButton')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatWeBuild;