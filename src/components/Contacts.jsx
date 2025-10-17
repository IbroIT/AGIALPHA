import React, { useState, useEffect, useRef } from 'react';

const Contacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState('');
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 20;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = `rgba(96, 165, 250, ${Math.random() * 0.1 + 0.05})`;
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

  const copyToClipboard = async (email, type) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(type);
      setTimeout(() => setCopiedEmail(''), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const contactMethods = [
    {
      type: 'General Inquiries',
      email: 'info@agialpha.pro',
      description: 'For general questions, partnerships, and business inquiries',
      icon: '📧',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'Press & Media',
      email: 'press@agialpha.pro',
      description: 'For media relations, press releases, and interview requests',
      icon: '📰',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div id='contact'
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] py-20"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1e40af 0%, #1e3a8a 50%, #1e1b4b 100%)`
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
      />

      <div 
        className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contact</span> Us
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team for inquiries, partnerships, and media relations
          </p>
        </div>

        {/* Contact Methods */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {method.type}
                </h3>
                
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {method.description}
                </p>

                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(method.email, method.type)}
                    className="group/email w-full bg-white/5 border border-white/20 hover:border-cyan-400/50 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="text-cyan-400 font-mono text-lg group-hover/email:text-cyan-300 transition-colors duration-300">
                      {method.email}
                    </div>
                    <div className="text-blue-200 text-sm mt-1">
                      {copiedEmail === method.type ? '✓ Copied!' : 'Click to copy'}
                    </div>
                  </button>
                  
                  {copiedEmail === method.type && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Response Time Info */}
        <div className={`backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-semibold text-lg">Quick Response Time</span>
            </div>
            
            <p className="text-blue-100 text-lg">
              We typically respond to all inquiries within <span className="text-cyan-300 font-semibold">24 hours</span> during business days
            </p>
            
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;