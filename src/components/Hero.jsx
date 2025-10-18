import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef(null);

  // Получаем слова из переводов
  const words = t('hero.words', { returnObjects: true });
  const currentWord = words[currentWordIndex];

  // Typewriter effect
  useEffect(() => {
    if (!words.length) return;

    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        } else {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }
      } else {
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWord, words]);

  // Mount animation
  useEffect(() => setIsMounted(true), []);

  // Particle background (остается без изменений)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = `rgba(59, 130, 246, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.3 }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 transform ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              {t('hero.title.firstLine')}
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {displayedText}
              </span>
              <span className="absolute -right-4 top-0 w-0.5 h-full bg-blue-400 animate-pulse" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
              {t('hero.title.thirdLine')}
            </span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 transform ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-base sm:text-lg md:text-2xl text-blue-100 mb-8 max-w-2xl sm:max-w-4xl mx-auto leading-relaxed px-2">
            {t('hero.description')}
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 transform ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-blue-400/20">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {t('hero.stats.years.value')}
              </div>
              <div className="text-blue-200 text-sm sm:text-base">
                {t('hero.stats.years.label')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {t('hero.stats.framework.value')}
              </div>
              <div className="text-blue-200 text-sm sm:text-base">
                {t('hero.stats.framework.label')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {t('hero.stats.focus.value')}
              </div>
              <div className="text-blue-200 text-sm sm:text-base">
                {t('hero.stats.focus.label')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-7 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-2.5 sm:h-3 bg-blue-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;