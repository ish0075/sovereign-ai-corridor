import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cpu, 
  Zap, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Users, 
  Wind,
  ChevronLeft,
  ChevronRight,
  Mail,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  Headphones
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Corridor', href: '#corridor' },
    { label: 'Allanburg', href: '#allanburg' },
    { label: 'Nanticoke', href: '#nanticoke' },
    { label: 'Mandate', href: '#mandate' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-dark/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal to-teal flex items-center justify-center">
              <Cpu className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-lg hidden sm:block">
              <span className="text-white">Sovereign</span>
              <span className="text-teal">AI Corridor</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-teal transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
              Request Briefing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-dark/95 backdrop-blur-md border-b border-white/5">
          <div className="section-padding py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-400 hover:text-teal hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block btn-primary text-center mt-4"
            >
              Request Briefing
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Audio Player Component - Hero CTA Style
function AudioPlayer({ 
  title, 
  subtitle,
  audioUrl = "#",
  variant = "default"
}: { 
  title: string; 
  subtitle?: string;
  audioUrl?: string;
  variant?: "default" | "hero";
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (variant === "hero") {
    return (
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-teal via-teal to-teal rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
        
        <div className="relative sci-fi-card p-4 sm:p-6 border-2 border-teal/50 bg-dark/95 backdrop-blur-sm">
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
          
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal/20 flex items-center justify-center animate-pulse flex-shrink-0">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-teal" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs text-teal uppercase tracking-wider font-semibold">Listen to the Briefing</span>
              <h4 className="text-white font-bold text-sm sm:text-lg truncate">{title}</h4>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4 sm:mb-5">
            <div className="flex items-center gap-3">
              {/* Large Play Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-teal to-cyan-dark hover:from-teal-light hover:to-cyan flex items-center justify-center transition-all duration-300 shadow-neon-teal hover:shadow-glow-cyan hover:scale-105 flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 text-black ml-0.5 sm:ml-1" />
                )}
              </button>

              {/* Track Info - Mobile */}
              <div className="flex-1 sm:hidden">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-teal/10 text-teal text-[10px] font-mono">AI BRIEFING</span>
                </div>
                <div className="text-gray-400 text-xs">
                  {isPlaying ? 'Now Playing' : 'Click to listen'}
                </div>
              </div>

              {/* Duration - Mobile */}
              <div className="text-right sm:hidden">
                <div className="text-lg font-bold text-white font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-[10px] text-gray-500">
                  / {formatTime(duration || 0)}
                </div>
              </div>
            </div>

            {/* Track Info - Desktop */}
            <div className="hidden sm:block flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-teal/10 text-teal text-xs font-mono">AI BRIEFING</span>
                <span className="text-gray-500 text-sm">{subtitle}</span>
              </div>
              <div className="text-gray-400 text-sm">
                {isPlaying ? 'Now Playing' : 'Click to listen'}
              </div>
            </div>

            {/* Duration - Desktop */}
            <div className="hidden sm:block text-right">
              <div className="text-2xl font-bold text-white font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-500">
                / {formatTime(duration || 0)}
              </div>
            </div>
          </div>

          {/* Progress Bar - Large */}
          <div className="relative h-2.5 sm:h-3 bg-white/10 rounded-full overflow-hidden">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-gradient-to-r from-teal via-teal to-teal rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            {/* Glow on progress */}
            <div 
              className="absolute top-0 bottom-0 w-3 sm:w-4 bg-white/50 blur-sm rounded-full"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          {/* Visualizer bars (decorative) */}
          <div className="flex items-end justify-center gap-0.5 sm:gap-1 mt-3 sm:mt-4 h-6 sm:h-8">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-teal/60' : 'bg-white/10'
                }`}
                style={{
                  height: isPlaying ? `${20 + Math.random() * 60}%` : '20%',
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sci-fi-card p-3 sm:p-4 border border-teal/30">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal/20 hover:bg-teal/30 flex items-center justify-center transition-colors border border-teal/50 flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-teal" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-teal ml-0.5" />
          )}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <Headphones className="w-3 h-3 sm:w-4 sm:h-4 text-teal" />
            <span className="text-[10px] sm:text-xs text-teal uppercase tracking-wider">Audio Briefing</span>
          </div>
          <h4 className="text-white font-medium text-sm sm:text-base truncate">{title}</h4>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 truncate">{subtitle}</p>}
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3">
        <span className="text-[10px] sm:text-xs text-gray-500 font-mono w-8 sm:w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <div className="flex-1 relative h-1.5 bg-white/10 rounded-full overflow-hidden">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div 
            className="h-full bg-gradient-to-r from-teal to-teal rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] sm:text-xs text-gray-500 font-mono w-8 sm:w-10">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation with stagger
      gsap.from(textRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-screen Background Image - Robot */}
      <div className="absolute inset-0">
        {/* Robot image as full background - very subtle */}
        <img
          src="/robot-hero-new.jpg"
          alt="AI Power Guardian with Hydro Towers"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.40 }}
        />
        
        {/* Light global dark tint so 25% opacity image remains visible */}
        <div className="absolute inset-0 bg-[#0a0a0a]/30" />
        
        {/* Gradient overlay for text readability - desktop */}
        <div 
          className="absolute inset-0 hidden sm:block" 
          style={{
            background: 'linear-gradient(to right, rgba(5, 10, 20, 0.92) 0%, rgba(5, 10, 20, 0.85) 35%, rgba(5, 10, 20, 0.70) 55%, rgba(5, 10, 20, 0.50) 75%, rgba(5, 10, 20, 0.30) 100%)'
          }}
        />
        
        {/* Mobile overlay - lighter gradient from top for text readability */}
        <div 
          className="absolute inset-0 sm:hidden" 
          style={{
            background: 'linear-gradient(to bottom, rgba(5, 10, 20, 0.94) 0%, rgba(5, 10, 20, 0.85) 25%, rgba(5, 10, 20, 0.70) 45%, rgba(5, 10, 20, 0.50) 70%, rgba(5, 10, 20, 0.25) 100%)'
          }}
        />
        
        {/* Bottom fade for scroll indicator area */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Content - responsive width */}
      <div className="relative z-10 section-padding w-full pt-20 sm:pt-24 pb-24 sm:pb-32">
        <div className="max-w-lg sm:max-w-md lg:max-w-sm">
          <div ref={textRef} className="text-left">
            {/* Tech badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00e6b4]/20 border border-[#00e6b4]/50 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#00e6b4] animate-pulse" style={{ boxShadow: '0 0 10px #00e6b4' }} />
              <span className="text-xs text-[#00e6b4] font-medium">Already Built · Already Mapped · Already in Motion</span>
            </div>

            {/* Main headline - BOLD and LARGE */}
            <h1 className="leading-none mb-6 sm:mb-8">
              <span 
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#00e6b4] font-orbitron tracking-wider font-black"
                style={{ textShadow: '0 4px 40px rgba(0,230,180,0.4), 0 2px 20px rgba(0,0,0,0.9)' }}
              >
                CANADA'S SOVEREIGN
              </span>
              <span 
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-2 sm:mt-3 font-orbitron tracking-wider font-black"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8), 0 2px 20px rgba(0,0,0,0.9)' }}
              >
                AI CORRIDOR
              </span>
            </h1>

            {/* Subheadline - clean style */}
            <p 
              className="text-sm sm:text-base text-gray-300 max-w-lg mb-8"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
            >
              The first sovereign‑AI hyperscale corridor in Canada. 500 kV on both sides. 230 kV energised today. Crown‑locked land with direct‑tap easements. This is not a what‑if. This is built.
            </p>

            {/* Featured Audio Player CTA */}
            <div className="mb-8 max-w-lg">
              <AudioPlayer 
                title="Canada's Shovel-Ready Sovereign AI Corridor"
                subtitle="Corridor Overview Audio"
                audioUrl="/audio/canada-sovereign-ai-corridor.mp3"
                variant="hero"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <a href="#corridor" className="btn-primary flex items-center justify-center gap-2">
                See the Built Corridor
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#mandate" className="btn-outline flex items-center justify-center gap-2">
                Fund the Mission
                <Shield className="w-5 h-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
              <div>
                <div 
                  className="text-xl sm:text-2xl font-bold text-[#00e6b4]"
                  style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
                >
                  500kV
                </div>
                <div className="text-xs sm:text-sm text-gray-400" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Both Sides</div>
              </div>
              <div>
                <div 
                  className="text-xl sm:text-2xl font-bold text-[#00e6b4]"
                  style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
                >
                  230kV
                </div>
                <div className="text-xs sm:text-sm text-gray-400" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Energised Today</div>
              </div>
              <div>
                <div 
                  className="text-xl sm:text-2xl font-bold text-[#00e6b4]"
                  style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
                >
                  Crown
                </div>
                <div className="text-xs sm:text-sm text-gray-400" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Land Locked</div>
              </div>
              <div>
                <div 
                  className="text-xl sm:text-2xl font-bold text-[#00e6b4]"
                  style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
                >
                  12 Mo
                </div>
                <div className="text-xs sm:text-sm text-gray-400" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Grid Validation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-mono" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#00e6b4' }} />
        </div>
      </div>
    </section>
  );
}

// Corridor Map Section
function CorridorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mapRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="corridor"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Quote Section - Lorne Loney */}
          <div className="mb-16 pb-12 border-b border-white/10">
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
              <img 
                src="/danloney.jpg" 
                alt="Lorne Loney" 
                className="w-full max-w-[200px] lg:max-w-[280px] h-auto border border-teal/30 flex-shrink-0 mx-auto lg:mx-0"
              />
              <div className="flex-1 w-full">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed font-orbitron tracking-wide" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                  "This is a flagship infrastructure corridor 'The Alley', is on par with the Trans‑Canada Highway or the St. Lawrence Seaway system—except we are not just moving people or freight; we are anchoring Canada's sovereign‑AI‑compute and grid‑ resilience future."
                </p>
                <p className="text-lg text-teal mt-4 font-orbitron">— Dan Loney, Sovereign AI Corridor Inc.</p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-orbitron tracking-wide">
              <span className="text-white">The Corridor</span>
              <span className="text-teal"> Already Exists</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              500 kV runs on both sides. 230 kV is already energised today. The parcels sit directly on Crown‑owned, sovereign‑controlled land, formally classified for industrial‑scale energy and infrastructure use. This is not a what‑if. This is built.
            </p>
          </div>

          {/* Node Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Node 1 */}
            <a href="#allanburg" className="sci-fi-card p-4 sm:p-6 group hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-bold text-teal">01</span>
                </div>
                <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal/10 text-teal text-[10px] sm:text-xs font-medium">
                  Node 1
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-teal transition-colors">
                Allanburg Sovereign AI Campus
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                230 kV energised campus. Three verified Crown parcels: 243.248 acres federal, 41.431 acres provincial, 23.6 acres provincial.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal" />
                  100-200 MW
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal" />
                  308.279 ac Crown
                </span>
              </div>
            </a>

            {/* Node 2 */}
            <a href="#nanticoke" className="sci-fi-card p-4 sm:p-6 group hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-bold text-teal">02</span>
                </div>
                <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal/10 text-teal text-[10px] sm:text-xs font-medium">
                  Node 2
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-teal transition-colors">
                Nanticoke 500kV Crown Node
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                Provincial Crown land. Direct 500kV access. Adjacent to OPG Nanticoke Generating Station.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal" />
                  500kV
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal" />
                  237.208 ac Crown
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Built to Hyperscale Spec Section
function BuiltSpecSection() {
  const features = [
    {
      icon: Zap,
      title: 'Grid Locked',
      description: '500 kV on both sides. 230 kV is already energised today. Direct‑tap easements on property mean hyperscale interconnection without years of upgrades.',
      color: 'cyan',
    },
    {
      icon: Wind,
      title: 'Cooling Superhighway',
      description: 'St. Lawrence Seaway cooling. Lake Erie cooling. Three‑season ambient cooling. This is not just power‑dense infrastructure; this is a cooling superhighway.',
      color: 'cyan',
    },
    {
      icon: TrendingUp,
      title: 'Energy Recycling',
      description: 'Stelco waste‑heat‑recovery integration turns this into energy‑recycling infrastructure. This is the exact spec hyperscalers spend billions trying to replicate.',
      color: 'cyan',
    },
    {
      icon: Shield,
      title: 'Crown Land Locked',
      description: 'Parcels sit directly on Crown‑owned, sovereign‑controlled land, formally classified for industrial‑scale energy and infrastructure use, virtually cleared and free from residential issues.',
      color: 'cyan',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-dark-light">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Built to </span>
              <span className="gradient-text">Hyperscale Spec</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              This is the exact specification hyperscalers spend billions trying to replicate across the world. In Canada, the corridor already exists.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="sci-fi-card p-4 sm:p-6 text-center group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-teal" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Validation Section
function ValidationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="animate-in sci-fi-card p-8 lg:p-10 border-l-4 border-teal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-teal" />
              </div>
              <span className="text-teal text-sm font-semibold uppercase tracking-wider">12‑Month Validation</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Proving the Corridor with Portable Equipment
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              A 12‑month grid‑and‑load feasibility test will validate transmission capacity, demand profile, and BESS‑assisted grid stability—using only portable, non‑permanent equipment. We are not guessing. We are measuring what is already there.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="sci-fi-card p-4 text-center">
                <div className="text-teal font-bold text-lg mb-1">Transmission</div>
                <div className="text-gray-500">Capacity validation</div>
              </div>
              <div className="sci-fi-card p-4 text-center">
                <div className="text-teal font-bold text-lg mb-1">Demand</div>
                <div className="text-gray-500">Load profiling</div>
              </div>
              <div className="sci-fi-card p-4 text-center">
                <div className="text-teal font-bold text-lg mb-1">BESS</div>
                <div className="text-gray-500">Grid stability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Policy Locked Section
function PolicyLockedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-dark-light">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="animate-in text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Policy </span>
              <span className="gradient-text">Locked</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              This project is under active ISED review, aligned with federal innovation, economic development, and clean‑energy mandates. Crown land‑holding agencies and Hydro One are already in the process pipeline for this corridor.
            </p>
          </div>

          <div className="animate-in grid md:grid-cols-3 gap-6">
            <div className="sci-fi-card p-6">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ISED Review</h3>
              <p className="text-sm text-gray-400">Active federal review under the Sovereign AI Compute Strategy and Large‑Scale Sovereign AI Data Centre programs.</p>
            </div>
            <div className="sci-fi-card p-6">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Crown Agencies</h3>
              <p className="text-sm text-gray-400">Crown land‑holding agencies and Hydro One are already in the process pipeline for this corridor.</p>
            </div>
            <div className="sci-fi-card p-6">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ministerial Vision</h3>
              <p className="text-sm text-gray-400">Dan Loney and Sovereign AI Corridor Inc. are manifesting ISED and The Honourable Evan Solomon's vision for Canada's AI sovereignty.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Indigenous Engagement Section
function IndigenousSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="animate-in sci-fi-card p-8 lg:p-10 border border-teal/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-teal" />
              </div>
              <span className="text-teal text-sm font-semibold uppercase tracking-wider">Indigenous Engagement</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Meaningful Participation & Long‑Term Benefit‑Sharing
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We are engaging early and in good faith with nearby Indigenous communities, respecting the Crown's duty to consult and the rights and interests of First Nations, Métis, and Inuit peoples. Our goal is to ensure that this project supports meaningful participation, economic opportunity, and long‑term benefit‑sharing—not just technical and economic gain for others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Flagship Infrastructure Section
function FlagshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-dark-light">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="animate-in text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Flagship </span>
              <span className="gradient-text">Infrastructure</span>
            </h2>
          </div>

          <div className="animate-in sci-fi-card p-8 lg:p-12 border border-teal/30 bg-gradient-to-r from-teal/5 via-transparent to-teal/5">
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed text-center font-orbitron tracking-wide">
              "This is a flagship infrastructure corridor 'The Alley', is on par with the Trans‑Canada Highway or the St. Lawrence Seaway system—except we are not just moving people or freight; we are anchoring Canada's sovereign‑AI‑compute and grid‑ resilience future."
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal" />
                <span>Trans‑Canada Highway scale</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal" />
                <span>St. Lawrence Seaway scope</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal" />
                <span>AI‑compute moonshot impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Slide Carousel Component
function BriefingDeckSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="section-padding relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-sm text-teal font-medium">Presentation Deck</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-orbitron tracking-wide">
              <span className="text-white">The Sovereign AI</span>
              <br />
              <span className="text-teal">Corridor Briefing</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Full presentation deck outlining the strategic vision, land assembly, and implementation roadmap.
            </p>
          </div>

          {/* PowerPoint Deck Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-dark p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Slide Preview Graphic */}
              <div className="w-full lg:w-1/2 aspect-video rounded-xl bg-gradient-to-br from-teal/20 via-dark to-teal/10 border border-teal/30 flex items-center justify-center relative overflow-hidden">
                <img
                  src="/nanticoke-crown-assembly.jpg"
                  alt="Nanticoke Crown Assembly - 500kV Power Grid Infrastructure Map"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/40" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-orange-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                      <path d="M8 12h8v2H8zm0 4h8v2H8z" opacity="0.7"/>
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">The Sovereign AI Corridor</p>
                  <p className="text-teal text-sm">Strategic Briefing Deck</p>
                </div>
              </div>

              {/* Deck Info */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Presentation Deck</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  The complete strategic briefing for investors, government partners, and hyperscalers. 
                  Covers the full corridor architecture, Crown land assembly, 500kV grid interconnection, 
                  and the path to sovereign AI compute dominance in Canada.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="/The_Sovereign_AI_Corridor.pptx"
                    download
                    className="inline-flex items-center justify-center gap-2 btn-primary"
                  >
                    <span>Download PowerPoint</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-4">.pptx format • Compatible with PowerPoint, Keynote, and Google Slides</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Infographic Section
function InfographicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-transparent to-teal/5" />
      
      <div className="section-padding relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="animate-in text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-sm text-teal font-medium">Strategic Overview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Sovereign AI Hyperscale Corridor</span>
              <br />
              <span className="gradient-text">Canada</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              545+ acres across two nodes, 230 kV and 500 kV grid adjacency, and immediate development capability. 
              This is the exact spec hyperscalers spend billions trying to replicate.
            </p>
          </div>

          {/* Infographic Image */}
          <div className="animate-in relative group">
            {/* Glow border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-teal/30 via-teal/30 to-teal/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
              <img
                src="/sovereign ai hyperscale corridor canada.png"
                alt="Sovereign AI Hyperscale Corridor Canada — Allanburg and Nanticoke Nodes"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Key Stats from Infographic */}
          <div className="animate-in grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">545+</div>
              <div className="text-sm text-gray-500">Total Acres</div>
            </div>
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">2+ GW</div>
              <div className="text-sm text-gray-500">Scalable Capacity</div>
            </div>
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">230 kV + 500 kV</div>
              <div className="text-sm text-gray-500">Grid Adjacency</div>
            </div>
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">Day-1</div>
              <div className="text-sm text-gray-500">Development Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Full-Screen Slide Gallery Component
function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slides = [
    '/slides/slide-01.png',
    '/slides/slide-02.png',
    '/slides/slide-03.png',
    '/slides/slide-04.png',
    '/slides/slide-05.png',
    '/slides/slide-06.png',
    '/slides/slide-07.png',
    '/slides/slide-08.png',
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 lg:py-16 overflow-hidden"
    >
      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-sm text-teal font-medium">Visual Briefing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              <span className="text-white">The Corridor</span>{' '}
              <span className="gradient-text">In Slides</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Full presentation deck. Use the arrows to browse the complete strategic vision.
            </p>
          </div>

          {/* Gallery */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark shadow-2xl">
            {/* Main Image */}
            <div className="relative aspect-[16/9] w-full">
              {slides.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain bg-dark transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark/80 border border-white/10 flex items-center justify-center text-white hover:bg-teal/20 hover:border-teal/50 transition-all z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark/80 border border-white/10 flex items-center justify-center text-white hover:bg-teal/20 hover:border-teal/50 transition-all z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-dark/80 border border-white/10 text-sm text-white font-medium z-10">
              {currentIndex + 1} / {slides.length}
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-teal w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Nanticoke Section Component
function NanticokeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const keyFeatures = [
    "Provincial Crown land — 237.208 acres of heavy industrial-zoned land directly adjacent to the former OPG Nanticoke Generating Station and its existing 500kV transmission corridor.",
    "Direct 500kV access: the parcel sits on the same transmission spine that served one of Ontario's largest coal-fired generating stations, enabling gigawatt-scale AI compute with minimal new line build.",
    "Immediate industrial synergies with Stelco Lake Erie Works (steel manufacturing) to the north, creating potential waste-heat offtake partnerships and shared infrastructure.",
    "Nanticoke Solar Farm to the southeast provides behind-the-meter renewable integration potential, supporting carbon-neutral compute claims and grid-stabilizing BESS co-location.",
    "Lake Erie waterfront to the south offers abundant cooling water access and potential port-linked logistics for large equipment delivery.",
    "Flat topography, brownfield redevelopment status, and existing heavy-industrial zoning reduce environmental and permitting risk compared to greenfield sites."
  ];

  const parcelCards = [
    {
      name: "Nanticoke Crown Core",
      acreage: "237.208 acres",
      zoning: "Heavy Industrial",
      description: "Provincial Crown land core parcel with direct 500kV transmission adjacency and OPG site access.",
      color: "teal"
    },
    {
      name: "OPG Nanticoke Station",
      location: "Adjacent to Crown Core",
      acreage: "Brownfield",
      zoning: "Industrial / Utility",
      description: "Former generating station site with extensive grid interconnection history and substation infrastructure.",
      color: "teal"
    },
    {
      name: "Stelco / Solar Buffer",
      location: "North & Southeast",
      acreage: "Industrial adjacency",
      zoning: "Heavy Industrial",
      description: "Stelco Lake Erie Works to the north and Nanticoke Solar Farm to the southeast create anchor load and renewable pairing.",
      color: "teal"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nanticoke"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="animate-in mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-medium">
                Node 2
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-teal font-orbitron tracking-wide">
              Nanticoke 500kV Crown Node
            </h2>
            <p className="text-xl text-gray-400">Provincial Crown land with direct 500kV access — the power anchor of the corridor</p>
          </div>

          {/* Intro Paragraph */}
          <div className="animate-in mb-12">
            <div className="sci-fi-card p-8 border-l-4 border-teal">
              <p className="text-lg text-gray-300 leading-relaxed">
                Nanticoke is the western power anchor of the Sovereign AI Corridor: a 237.208-acre 
                Provincial Crown parcel sitting directly on the 500kV transmission spine 
                that fed the former OPG Nanticoke Generating Station. With Stelco Lake Erie Works to the 
                north, the Nanticoke Solar Farm to the southeast, and Lake Erie to the south, this node 
                offers unmatched gigawatt-scale potential, industrial waste-heat partnerships, and 
                behind-the-meter renewable integration.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="animate-in mb-12">
            <div className="relative rounded-2xl overflow-hidden border border-teal/30">
              <img
                src="/nanticoke-crown-assembly.jpg"
                alt="Nanticoke Crown Assembly - 500kV Power Grid Infrastructure Map"
                className="w-full h-auto"
              />
              {/* Zone Legend Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72">
                <div className="bg-dark/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-3">Land Assembly</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal shadow-neon-teal" />
                      <span className="text-xs text-gray-300">Crown Core (237.208 ac)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal/60" />
                      <span className="text-xs text-gray-300">OPG Nanticoke Station</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal/30" />
                      <span className="text-xs text-gray-300">Stelco / Solar Farm / Lake Erie</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="animate-in mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Why Nanticoke</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sci-fi-card p-4">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-teal" />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Parcel Cards */}
          <div className="animate-in mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Key Land Parcels</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {parcelCards.map((parcel, index) => (
                <div
                  key={index}
                  className="sci-fi-card p-6"
                  style={{
                    borderColor: 'rgba(0,230,180,0.3)',
                    borderWidth: '1px',
                    boxShadow: '0 0 20px rgba(0,230,180,0.1)'
                  }}
                >
                  <div className="text-xs font-mono mb-2 text-teal">
                    {parcel.location}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{parcel.name}</h4>
                  <div className="space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Acreage:</span>
                      <span className="text-gray-300">{parcel.acreage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Zoning:</span>
                      <span className="text-gray-300">{parcel.zoning}</span>
                    </div>
                  </div>
                  <div className="text-xs px-3 py-2 rounded-lg bg-teal/10 text-teal">
                    {parcel.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="animate-in grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">237.208</div>
              <div className="text-sm text-gray-500">Crown Acres</div>
            </div>
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">500kV</div>
              <div className="text-sm text-gray-500">Direct Access</div>
            </div>
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">GW+</div>
              <div className="text-sm text-gray-500">Scalable Capacity</div>
            </div>
            <div className="sci-fi-card p-4 text-center border border-teal/20">
              <div className="text-3xl font-bold text-teal mb-1">Day-1</div>
              <div className="text-sm text-gray-500">Industrial Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Federal Mandate Section
function MandateSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      title: 'AI Compute Challenge',
      description: 'Federal initiative to expand Canada\'s AI computing capacity for researchers and industry.',
      link: 'https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy/ai-compute-challenge',
    },
    {
      title: 'Sovereign Compute Infrastructure Program',
      description: 'Investing in made-in-Canada AI infrastructure to support domestic AI development.',
      link: 'https://ised-isde.canada.ca/site/ised/en/ai-sovereign-compute-infrastructure-program',
    },
    {
      title: 'Large-Scale Sovereign AI Data Centres',
      description: 'Strategic call for proposals to establish major AI data centre facilities in Canada.',
      link: 'https://ised-isde.canada.ca/site/ised/en/enabling-large-scale-sovereign-ai-data-centres',
    },
  ];

  const checklist = [
    { icon: Shield, text: 'Policy‑Locked Corridor' },
    { icon: Zap, text: 'Grid‑Locked Interconnection' },
    { icon: MapPin, text: 'Crown‑Land‑Locked Parcels' },
    { icon: Users, text: 'Indigenous Benefit‑Sharing' },
    { icon: Cpu, text: 'Hyperscale‑Grade Spec' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mandate"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-light"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="animate-in text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Canada's AI</span>
              <br />
              <span className="gradient-text">Compute Moonshot</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Dan Loney and Sovereign AI Corridor Inc. are manifesting ISED and The Honourable Evan Solomon's vision for Canada's AI sovereignty. The corridor is already built. You just need to fund the mission.
            </p>
          </div>

          {/* Programs */}
          <div className="animate-in grid md:grid-cols-3 gap-6 mb-16">
            {programs.map((program, index) => (
              <a
                key={index}
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sci-fi-card p-6 group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-teal" />
                  </div>
                  <span className="text-xs text-gray-500">Federal Program</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal transition-colors">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-400">{program.description}</p>
              </a>
            ))}
          </div>

          {/* Checklist */}
          <div className="animate-in">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Corridor Delivers
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {checklist.map((item, index) => (
                <div
                  key={index}
                  className="sci-fi-card p-4 flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-teal" />
                  </div>
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Urgency Section
function UrgencySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="animate-in sci-fi-card p-8 lg:p-12 border-2 border-teal/50 bg-gradient-to-r from-teal/10 via-transparent to-teal/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 text-center font-orbitron tracking-wide">
              He Who Hesitates Is Last
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center mb-6">
              Do not sit by and watch this corridor power another country's hyperscaler ecosystem while Canada is left regulating tariffs and taxes, not defining the technological frontier. This is a policy‑locked, grid‑locked, Crown‑land‑locked AI‑compute and BESS corridor that only you can capitalise on.
            </p>
            <div className="text-center">
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Fund the Mission
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormState({ name: '', organization: '', email: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="animate-in text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Fund the </span>
              <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Canada's AI‑compute moonshot is affirmed. The corridor is already built. The corridor is already mapped. The corridor is already in motion. You just need to fund the mission.
            </p>
            <p className="text-xl text-teal mt-4 font-orbitron tracking-wide">
              He who hesitates is last.
            </p>
          </div>

          {/* Form */}
          <div className="animate-in sci-fi-card p-4 sm:p-6 lg:p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-teal" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Transmitted</h3>
                <p className="text-gray-400">We will be in touch to discuss funding the mission.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-4 min-h-[48px] bg-dark border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition-colors text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Organization</label>
                    <input
                      type="text"
                      required
                      value={formState.organization}
                      onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                      className="w-full px-4 py-4 min-h-[48px] bg-dark border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition-colors text-base"
                      placeholder="Your organization"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-4 min-h-[48px] bg-dark border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition-colors text-base"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-4 bg-dark border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition-colors resize-none text-base"
                    placeholder="How can we help?"
                  />
                </div>
                {submitError && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Transmit Briefing Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="animate-in mt-8 text-center space-y-2">
            <p className="text-gray-500 text-sm">
              Or reach us directly at{' '}
              <a href="mailto:spv@sovereignaicorridor.ca" className="text-teal hover:underline">
                spv@sovereignaicorridor.ca
              </a>
            </p>
            <p className="text-gray-500 text-sm">
              Phone:{' '}
              <a href="tel:+16478017532" className="text-teal hover:underline">
                647 801 7532
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal to-teal flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-xl">
                  <span className="text-white">Sovereign</span>
                  <span className="text-teal">AI Corridor</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm max-w-md mb-4">
                Sovereign AI Corridor Inc. built the corridor. Sovereign AI Corridor Inc. 
                de‑risked the tech. Sovereign AI Corridor Inc. packaged it under ISED's mandate. 
                Canada's sovereign‑AI‑compute and grid‑resilience future starts here.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Corridor</h4>
              <ul className="space-y-3">
                <li><a href="#allanburg" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors py-1 block">Allanburg Campus</a></li>
                <li><a href="#nanticoke" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors py-1 block">Nanticoke 500kV Node</a></li>
                <li><a href="#mandate" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors py-1 block">Federal Mandate</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors flex items-center gap-1 py-1">
                    ISED Strategy
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://datacenternews.ca" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors flex items-center gap-1 py-1">
                    Data Centre News
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li><a href="#contact" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors py-1 block">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="/terms.html" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors py-1 block">Terms & Conditions</a></li>
                <li><a href="/privacy.html" className="text-sm text-gray-400 hover:text-teal active:text-teal transition-colors py-1 block">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Sovereign AI Corridor Inc. Niagara Corridor.
            </p>
            <div className="flex items-center gap-6">
              <a href="/terms.html" className="text-xs text-gray-600 hover:text-teal transition-colors">Terms & Conditions</a>
              <a href="/privacy.html" className="text-xs text-gray-600 hover:text-teal transition-colors">Privacy Policy</a>
              <span className="text-xs text-gray-600">Built for Canada's AI Future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Allanburg Section - Custom detailed section
function AllanburgSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.animate-in') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    'Verified Crown parcel: 243.248 acres of federal Crown land with a historic Crown title chain.',
    'Verified Crown parcel: 41.431 acres of provincial Crown land, zoned LI (Light Industrial), assessed at $491,000.',
    'Verified Crown parcel: 23.6 acres of provincial Crown land adjacent to the 230 kV transformer station, creating a direct build pad for 800 MW scale.',
    'Direct adjacency to the 230 kV transformer station, enabling 100–200 MW of initial AI and BESS capacity with clear paths to scale beyond 800 MW.',
    'Existing road and rail infrastructure already in place, reducing greenfield risk and construction timelines.',
  ];

  const rings = [
    {
      name: 'Inner Ring',
      title: 'Provincial Power Pad',
      color: 'cyan',
      description: '23.6 acres of provincial Crown land adjacent to the 230 kV transformer station. The closest build pad to the station for 800 MW scale.',
    },
    {
      name: 'Middle Ring',
      title: 'Federal Crown Belt',
      color: 'magenta',
      description: '243.248 acres of federal Crown land with a historic Crown title chain, forming the core land assembly.',
    },
    {
      name: 'Outer Ring',
      title: 'Provincial Industrial Layer',
      color: 'lime',
      description: '41.431 acres of provincial Crown land (LI-zoned), designated for industrial conversion and immediate build-out.',
    },
  ];

  const parcelCards = [
    {
      name: 'Provincial Crown Power Pad',
      acreage: '23.6 acres',
      zoning: 'Industrial',
      owner: 'Provincial Crown',
      role: 'Closest Crown parcel to the 230 kV station — direct build pad for 800 MW',
      color: 'cyan',
    },
    {
      name: 'Federal Crown Core',
      acreage: '243.248 acres',
      zoning: 'Federal Crown / LI',
      owner: 'Federal Crown',
      role: 'Historic Crown land forming the core of the campus assembly',
      color: 'magenta',
    },
    {
      name: 'Provincial Industrial Parcel',
      acreage: '41.431 acres',
      zoning: 'LI (Light Industrial)',
      owner: 'Provincial Crown',
      role: 'Crown land designated for industrial conversion and immediate build-out',
      color: 'lime',
    },
  ];

  return (
    <section
      id="allanburg"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="animate-in mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-medium">
                Node 1
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-teal">
              Allanburg Sovereign AI Campus
            </h2>
            <p className="text-xl text-gray-400">230 kV energised Crown campus</p>
          </div>

          {/* Intro Paragraph */}
          <div className="animate-in mb-12">
            <div className="sci-fi-card p-8 border-l-4 border-teal">
              <p className="text-lg text-gray-300 leading-relaxed">
                Allanburg is the anchor of the Sovereign AI Corridor: a 230 kV-adjacent, 
                heavy-industrial campus wrapped by 308.279 acres of federal and provincial Crown land. 
                It is the natural launch pad for Canada's first large-scale sovereign AI campus.
              </p>
            </div>
          </div>

          {/* Map with Ring Overlay */}
          <div className="animate-in mb-12">
            <div className="relative rounded-2xl overflow-hidden border border-teal/30">
              <img
                src="/allanburg-map.jpg"
                alt="Allanburg Campus Map with Three Rings"
                className="w-full h-auto"
              />
              {/* Ring Legend Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64">
                <div className="bg-dark/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-3">Three-Ring Campus</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal shadow-neon-teal" />
                      <span className="text-xs text-gray-300">Inner: Build Pad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal" style={{ boxShadow: '0 0 10px rgba(255,0,255,0.5)' }} />
                      <span className="text-xs text-gray-300">Middle: Federal Belt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal" style={{ boxShadow: '0 0 10px rgba(204,255,0,0.5)' }} />
                      <span className="text-xs text-gray-300">Outer: Provincial Layer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Ring Explainer */}
          <div className="animate-in mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Three-Ring Campus Structure</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {rings.map((ring, index) => (
                <div
                  key={index}
                  className={`sci-fi-card p-6 border-${ring.color === 'cyan' ? 'cyan' : ring.color === 'magenta' ? 'magenta' : 'lime'}/30`}
                  style={{
                    borderColor: ring.color === 'cyan' ? 'rgba(0,212,255,0.3)' : ring.color === 'magenta' ? 'rgba(255,0,255,0.3)' : 'rgba(204,255,0,0.3)',
                    boxShadow: ring.color === 'cyan' ? '0 0 20px rgba(0,212,255,0.1)' : ring.color === 'magenta' ? '0 0 20px rgba(255,0,255,0.1)' : '0 0 20px rgba(204,255,0,0.1)'
                  }}
                >
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                    ring.color === 'cyan' ? 'text-teal' : ring.color === 'magenta' ? 'text-teal' : 'text-teal'
                  }`}>
                    {ring.name}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{ring.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{ring.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why This Site - 2 Column Feature List */}
          <div className="animate-in mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Why This Site</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sci-fi-card p-4">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-teal" />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Parcel Stats Cards */}
          <div className="animate-in mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Key Land Parcels</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {parcelCards.map((parcel, index) => (
                <div
                  key={index}
                  className="sci-fi-card p-6"
                  style={{
                    borderColor: parcel.color === 'cyan' ? 'rgba(0,212,255,0.3)' : parcel.color === 'magenta' ? 'rgba(255,0,255,0.3)' : 'rgba(204,255,0,0.3)',
                    borderWidth: '1px',
                    boxShadow: parcel.color === 'cyan' ? '0 0 20px rgba(0,212,255,0.1)' : parcel.color === 'magenta' ? '0 0 20px rgba(255,0,255,0.1)' : '0 0 20px rgba(204,255,0,0.1)'
                  }}
                >
                  <h4 className="text-lg font-bold text-white mb-2">{parcel.name}</h4>
                  <div className="space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Acreage:</span>
                      <span className="text-gray-300">{parcel.acreage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Zoning:</span>
                      <span className="text-gray-300">{parcel.zoning}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Owner:</span>
                      <span className="text-gray-300">{parcel.owner}</span>
                    </div>
                  </div>
                  <div className={`text-xs px-3 py-2 rounded-lg ${
                    parcel.color === 'cyan' ? 'bg-teal/10 text-teal' : 
                    parcel.color === 'magenta' ? 'bg-teal/10 text-teal' : 
                    'bg-teal/10 text-teal'
                  }`}>
                    {parcel.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Player */}
          <div className="animate-in mb-12">
            <AudioPlayer 
              title="Canada's Shovel-Ready Sovereign AI Corridor"
              subtitle="Corridor Overview Audio"
              audioUrl="/audio/canada-sovereign-ai-corridor.mp3"
              variant="hero"
            />
          </div>

          {/* One Sentence Summary */}
          <div className="animate-in">
            <div className="sci-fi-card p-6 text-center border border-teal/30 bg-gradient-to-r from-teal/5 via-transparent to-cyan/5">
              <p className="text-lg text-gray-300 italic">
                "Allanburg is a 230 kV-ready, 308.279-acre federal and provincial Crown land stack, 
                giving Canada a nearly plug-and-play site for sovereign AI 
                compute and large-scale batteries."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <main>
        <HeroSection />
        <CorridorSection />
        <BuiltSpecSection />
        <ValidationSection />
        <PolicyLockedSection />
        <IndigenousSection />
        <FlagshipSection />
        <BriefingDeckSection />
        <InfographicSection />
        <GallerySection />
        
        {/* Node 1 - Allanburg */}
        <AllanburgSection />

        {/* Node 2 - Nanticoke */}
        <NanticokeSection />

        <MandateSection />
        <UrgencySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
