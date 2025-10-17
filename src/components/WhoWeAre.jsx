import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const WhoWeAre = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
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
    const particleCount = 30;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = `rgba(96, 165, 250, ${Math.random() * 0.2 + 0.1})`;
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

  const capabilities = [
    {
      icon: '⏳',
      title: '10+ years',
      description: 'of professional market experience',
      delay: '0.1s'
    },
    {
      icon: '🛠️',
      title: 'Proprietary AI',
      description: 'analytics infrastructure',
      delay: '0.2s'
    },
    {
      icon: '📈',
      title: 'Advanced Modeling',
      description: 'Probability, GEX, Vega, and Monte-Carlo modeling',
      delay: '0.3s'
    },
    {
      icon: '🤝',
      title: 'Strategic Partnerships',
      description: 'with brokers and fintech data providers',
      delay: '0.4s'
    }
  ];

  return (
    <div id='who-we-are'
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] py-20"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1e40af 0%, #1e3a8a 50%, #1e1b4b 100%)`
      }}
    >
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Floating Elements */}
      <div  
        className="absolute top-20 left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Who We <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Are</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            We are a <span className="font-semibold text-cyan-300">research and analytics company</span> operating at 
            the intersection of <span className="font-semibold text-cyan-300">artificial intelligence</span> and 
            <span className="font-semibold text-cyan-300"> financial markets</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Mission Statement */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="group relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg font-bold">🎯</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                
                <p className="text-lg text-blue-100 leading-relaxed">
                  To apply <span className="font-semibold text-cyan-300">AGI-based analytical frameworks</span> to forecast 
                  market dynamics, liquidity flows, and option behavior through advanced artificial intelligence systems.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'AI Research', value: '100%' },
                    { label: 'Market Analysis', value: '95%' },
                    { label: 'Data Science', value: '90%' },
                    { label: 'Risk Modeling', value: '85%' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="text-2xl font-bold text-cyan-400 mb-2">{item.value}</div>
                      <div className="text-sm text-blue-200">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Key <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Leveraging cutting-edge technology and deep market expertise to deliver actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:bg-white/15`}
                style={{
                  animationDelay: isVisible ? capability.delay : '0s',
                  animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{capability.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className={`backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Advanced Analytics Framework</h3>
            <p className="text-blue-200 text-lg">
              Our proprietary infrastructure combines multiple analytical approaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Probability Modeling', color: 'from-green-500 to-emerald-500' },
              { name: 'GEX Analysis', color: 'from-blue-500 to-cyan-500' },
              { name: 'Vega Modeling', color: 'from-purple-500 to-pink-500' },
              { name: 'Monte-Carlo Simulation', color: 'from-orange-500 to-red-500' },
              { name: 'Liquidity Flow Analysis', color: 'from-cyan-500 to-blue-500' },
              { name: 'Risk Assessment', color: 'from-indigo-500 to-purple-500' }
            ].map((tech, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-full h-1 bg-gradient-to-r ${tech.color} rounded-full mb-3 transform group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
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
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default WhoWeAre;