import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

function TypewriterText({ text, delay = 0, speed = 40, className = '', onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Initial delay before starting
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setShowCursor(false);
        onComplete?.();
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTyping, text, speed, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!showCursor) return;
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
        style={{ marginBottom: '0.1em' }}
      />
    </span>
  );
}

interface NumberTransitionProps {
  from: number;
  to: number;
  delay?: number;
  className?: string;
}

function NumberTransition({ from, to, delay = 0, className = '' }: NumberTransitionProps) {
  const [currentValue, setCurrentValue] = useState(from);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 800;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCurrentValue(Math.round(from + (to - from) * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [from, to, delay]);

  return <span className={className}>{currentValue}</span>;
}

interface CenteredVideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
}

export function CenteredVideoPlayer({ videoUrl, posterUrl }: CenteredVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Animation phases based on video progress
  useEffect(() => {
    if (progress < 10) setAnimationPhase(0);
    else if (progress < 35) setAnimationPhase(1);
    else if (progress < 60) setAnimationPhase(2);
    else if (progress < 85) setAnimationPhase(3);
    else setAnimationPhase(4);
  }, [progress]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {
        videoRef.current?.requestFullscreen?.();
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          className="w-full h-full object-contain"
          playsInline
          loop
          onClick={togglePlay}
        />
      </div>

      {/* Play Overlay - shown when paused */}
      {!isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
          onClick={togglePlay}
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full bg-[#00e6b4] flex items-center justify-center shadow-[0_0_40px_rgba(0,230,180,0.5)]"
          >
            <Play className="w-10 h-10 text-black ml-1" fill="black" />
          </motion.div>
        </motion.div>
      )}

      {/* Text Overlays with Typewriter Effect */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Top Left - Crown Foundation */}
        <AnimatePresence mode="wait">
          {(animationPhase >= 0) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-8 left-8 md:top-12 md:left-12"
            >
              <div className="bg-black/60 backdrop-blur-sm border border-[#00e6b4]/30 rounded-lg px-6 py-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#00e6b4] font-orbitron tracking-wider mb-1">
                  {animationPhase === 0 ? (
                    <TypewriterText text="Crown Foundation" speed={60} />
                  ) : (
                    "Crown Foundation"
                  )}
                </h2>
                <p className="text-sm md:text-base text-gray-300">
                  {animationPhase === 0 ? (
                    <TypewriterText 
                      text="Federal & Provincial Crown land — 545+ acres sovereign-controlled." 
                      delay={600} 
                      speed={30}
                    />
                  ) : (
                    "Federal & Provincial Crown land — 545+ acres sovereign-controlled."
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle Right - 0 → 8 */}
        <AnimatePresence mode="wait">
          {(animationPhase >= 1) && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16"
            >
              <div className="bg-black/60 backdrop-blur-sm border border-[#00e6b4]/30 rounded-lg px-6 py-4">
                <div className="text-4xl md:text-6xl font-bold text-[#00e6b4] font-orbitron">
                  {animationPhase === 1 ? (
                    <>
                      <NumberTransition from={0} to={0} delay={0} />{' '}
                      <span className="text-gray-400">→</span>{' '}
                      <NumberTransition from={0} to={8} delay={400} />
                    </>
                  ) : (
                    "0 → 8"
                  )}
                </div>
                <p className="text-xs md:text-sm text-gray-400 mt-2 text-right">
                  Nodes in Development
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lower Left - 545+ Acres */}
        <AnimatePresence mode="wait">
          {(animationPhase >= 2) && (
            <motion.div
              initial={{ opacity: 0, y: 30, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-32 left-8 md:bottom-40 md:left-12"
            >
              <div className="bg-black/60 backdrop-blur-sm border border-[#00e6b4]/30 rounded-lg px-6 py-4 max-w-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-[#00e6b4] font-orbitron mb-2">
                  {animationPhase === 2 ? (
                    <TypewriterText text="545+ Acres" speed={80} />
                  ) : (
                    "545+ Acres"
                  )}
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  {animationPhase === 2 ? (
                    <TypewriterText 
                      text="Allanburg & Nanticoke nodes. Canada's sovereign AI corridor." 
                      delay={500} 
                      speed={35}
                    />
                  ) : (
                    "Allanburg & Nanticoke nodes. Canada's sovereign AI corridor."
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Right - 0 → 8 (Second occurrence) */}
        <AnimatePresence mode="wait">
          {(animationPhase >= 3) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-32 right-8 md:bottom-40 md:right-16"
            >
              <div className="bg-black/60 backdrop-blur-sm border border-[#00e6b4]/30 rounded-lg px-6 py-4">
                <div className="text-3xl md:text-5xl font-bold text-[#00e6b4] font-orbitron">
                  {animationPhase === 3 ? (
                    <>
                      <NumberTransition from={0} to={0} delay={0} />{' '}
                      <span className="text-gray-400">→</span>{' '}
                      <NumberTransition from={0} to={8} delay={400} />
                    </>
                  ) : (
                    "0 → 8"
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Center - Additional Info (500kV Grid, Cooling) */}
        <AnimatePresence mode="wait">
          {(animationPhase >= 4) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4"
            >
              <div className="bg-black/70 backdrop-blur-md border border-[#00e6b4]/30 rounded-xl px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* 500kV Grid */}
                  <div className="text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-bold text-[#00e6b4] font-orbitron mb-1">
                      {animationPhase === 4 ? (
                        <TypewriterText text="500kV / 230kV Grid" speed={50} />
                      ) : (
                        "500kV / 230kV Grid"
                      )}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300">
                      {animationPhase === 4 ? (
                        <TypewriterText 
                          text="Direct-tap easements. Grid-locked interconnection ready." 
                          delay={600} 
                          speed={30}
                        />
                      ) : (
                        "Direct-tap easements. Grid-locked interconnection ready."
                      )}
                    </p>
                  </div>

                  {/* Cooling Superhighway */}
                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-bold text-[#00e6b4] font-orbitron mb-1">
                      {animationPhase === 4 ? (
                        <TypewriterText text="Cooling Superhighway" speed={50} delay={1200} />
                      ) : (
                        "Cooling Superhighway"
                      )}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300">
                      {animationPhase === 4 ? (
                        <TypewriterText 
                          text="St. Lawrence + Lake Erie cooling. PUE < 1.1" 
                          delay={1800} 
                          speed={30}
                        />
                      ) : (
                        "St. Lawrence + Lake Erie cooling. PUE < 1.1"
                      )}
                    </p>
                  </div>

                  {/* Crown Foundation */}
                  <div className="text-center md:text-right">
                    <h4 className="text-lg md:text-xl font-bold text-[#00e6b4] font-orbitron mb-1">
                      {animationPhase === 4 ? (
                        <TypewriterText text="Crown Foundation" speed={50} delay={2400} />
                      ) : (
                        "Crown Foundation"
                      )}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300">
                      {animationPhase === 4 ? (
                        <TypewriterText 
                          text="Federal & Provincial Crown land — 545+ acres sovereign-controlled." 
                          delay={3000} 
                          speed={30}
                        />
                      ) : (
                        "Federal & Provincial Crown land — 545+ acres sovereign-controlled."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 z-30"
          >
            <div className="max-w-6xl mx-auto">
              {/* Progress Bar */}
              <div className="relative h-1.5 bg-white/20 rounded-full mb-4 overflow-hidden group">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#00e6b4] rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-[#00e6b4] hover:bg-[#00e6b4]/80 flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-black" fill="black" />
                    ) : (
                      <Play className="w-5 h-5 text-black ml-0.5" fill="black" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  <div className="text-sm text-white/80 font-mono">
                    {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
                  </div>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
    </div>
  );
}

export default CenteredVideoPlayer;
