import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, Star, Coffee, Music, VolumeX, Cake as CakeIcon } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number; duration: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 60 + 30, // Larger to simulate background shapes
      opacity: Math.random() * 0.15 + 0.1, // Subtle opacity
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px]"
          initial={{ y: 100, x: 0, opacity: 0 }}
          animate={{
            y: '-110vh',
            x: [0, 50, -50, 0],
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, -15, 15, -10],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: heart.left }}
        >
          <Heart fill="currentColor" className="text-white" size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
};

const TwinklingStars = () => {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      size: Math.random() * 3 + 1,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size
          }}
        />
      ))}
    </div>
  );
};

const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<{ id: number; left: string; delay: number; duration: number; color: string; scale: number; }[]>([]);
  const balloonColors = ['#ff4d8d', '#06b6d4', '#22d3ee', '#ec4899', '#ffffff', '#0891b2'];

  useEffect(() => {
    const newBalloons = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15,
      scale: Math.random() * 0.8 + 0.5,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    }));
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute bottom-[-150px]"
          initial={{ y: 150, x: 0, opacity: 0 }}
          animate={{
            y: '-120vh',
            x: [0, Math.random() * 40 - 20, Math.random() * -40 + 20, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: balloon.left, transform: `scale(${balloon.scale})` }}
        >
          <svg width="60" height="90" viewBox="0 0 40 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
            <path d="M20 0C8.9543 0 0 10.7452 0 24C0 37.2548 10 48 20 48C30 48 40 37.2548 40 24C40 10.7452 31.0457 0 20 0Z" fill={balloon.color} />
            <path d="M18 48L22 48L20 52L18 48Z" fill={balloon.color} />
            <path d="M20 52C20 65 10 75 20 90" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
            <path d="M10 14C10 14 15 6 25 8" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// ── Sound: play crackers audio file from /audio/crackers.mp3 ─────────────────
const playFirecrackerSound = () => {
  const audio = new Audio('/audio/crackers.mp3');
  audio.volume = 1.0;
  audio.play().catch((e) => console.warn('Cracker sound blocked:', e));
};

// ── Firecracker burst overlay ────────────────────────────────────────────────
const flameVariants = {
  visible: {
    scale: [1, 1.2, 1] as number[],
    opacity: 1 as number,
    rotate: [-5, 5, -5] as number[],
    transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' as const },
  },
  blown: {
    x: 45,
    scaleX: 2.5,
    scaleY: 0,
    opacity: 0,
    rotate: 65,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

type Burst = { id: number; x: number; y: number; color: string; delay: number };

const FirecrackerParticles = ({ active }: { active: boolean }) => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (!active) { setBursts([]); return; }
    const colors = ['#ff4d8d', '#06b6d4', '#22d3ee', '#ffffff', '#ec4899', '#67e8f9', '#f472b6', '#0891b2', '#a5f3fc', '#be185d'];
    const fire = () => {
      setBursts(prev => [
        ...prev.slice(-36),
        ...Array.from({ length: 3 }, (_, i) => ({
          id: Date.now() + i + Math.random() * 99999,
          x: Math.random() * 85 + 5,
          y: Math.random() * 65 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.2,
        })),
      ]);
    };
    fire();
    const iv = setInterval(fire, 700);
    return () => clearInterval(iv);
  }, [active]);

  if (bursts.length === 0) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[70]">
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute" style={{ left: `${burst.x}%`, top: `${burst.y}%` }}>
          <motion.div
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ width: 18, height: 18, backgroundColor: burst.color, boxShadow: `0 0 30px ${burst.color}` }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.4, delay: burst.delay }}
          />
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i / 16) * 360;
            const dist = Math.random() * 110 + 55;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ width: 5, height: 5, backgroundColor: burst.color, boxShadow: `0 0 8px ${burst.color}` }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * dist,
                  y: Math.sin((angle * Math.PI) / 180) * dist,
                  opacity: 0, scale: 0,
                }}
                transition={{ duration: 1 + Math.random() * 0.5, delay: burst.delay, ease: 'easeOut' }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const AnimatedCake = ({ onCut, onBlow }: { onCut: () => void; onBlow: () => void }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isCutting, setIsCutting] = useState(false); // knife animating
  const [isCut, setIsCut] = useState(false);         // slice separated

  const handleAction = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      onBlow();
    } else if (!isCut && !isCutting) {
      setIsCutting(true);
      // After knife reaches cake (0.7s), trigger cut; knife lifts at 1.4s
      setTimeout(() => { setIsCut(true); onCut(); }, 900);
      setTimeout(() => setIsCutting(false), 1600);
    }
  };

  return (
    <div className="relative mx-auto flex flex-col items-center justify-end" style={{ width: 220, height: 280 }}>

      {/* ── Knife ── */}
      <AnimatePresence>
        {isCutting && (
          <motion.div
            className="absolute z-30 flex flex-col items-center"
            style={{ top: -80, left: '55%' }}
            initial={{ y: -60, rotate: -8, opacity: 0 }}
            animate={{ y: [0, 110, 110, -60], rotate: [-8, -5, -5, -8], opacity: [1, 1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.45, 0.65, 1], ease: 'easeInOut' }}
          >
            {/* Blade */}
            <svg width="28" height="110" viewBox="0 0 28 110" fill="none">
              <path d="M14 0 L22 90 L14 100 L6 90 Z" fill="url(#bladeGrad)" />
              <path d="M14 100 L12 110 L16 110 Z" fill="#aaa" />
              <defs>
                <linearGradient id="bladeGrad" x1="0" y1="0" x2="28" y2="110" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e8e8e8" />
                  <stop offset="60%" stopColor="#c0c0c0" />
                  <stop offset="100%" stopColor="#888" />
                </linearGradient>
              </defs>
            </svg>
            {/* Handle */}
            <div className="w-7 h-10 rounded-md"
              style={{ background: 'linear-gradient(to bottom, #5c3317, #3b1f0e)', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Candles ── */}
      <div className="flex gap-5 mb-[-8px] z-20">
        {[0, 1, 2].map((candleIdx) => (
          <div key={candleIdx} className="relative flex flex-col items-center">
            <AnimatePresence>
              {!candlesBlown && (
                <motion.div
                  variants={flameVariants}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate="visible"
                  exit="blown"
                  className="w-4 h-6 rounded-full blur-[1px] absolute -top-8 origin-bottom"
                  style={{ background: 'linear-gradient(to top, #f97316, #facc15, #fef9c3)' }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {candlesBlown && (
                <motion.div
                  key={`smoke-${candleIdx}`}
                  initial={{ opacity: 0.7, y: 0, scaleX: 0.8, scaleY: 0.5 }}
                  animate={{ opacity: 0, y: -44, scaleX: 3, scaleY: 2 }}
                  exit={{}}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: candleIdx * 0.08 }}
                  className="w-2 h-3 bg-white/40 rounded-full blur-[3px] absolute -top-8 origin-bottom"
                />
              )}
            </AnimatePresence>
            {/* Chocolate-striped candle */}
            <div className="w-3 h-12 rounded-t-sm shadow-sm overflow-hidden"
              style={{ background: 'repeating-linear-gradient(to bottom, #fff 0px, #fff 4px, #92400e 4px, #92400e 8px)' }}
            />
            <div className="w-3 h-2 mt-[-2px]" style={{ background: '#78350f' }} />
          </div>
        ))}
      </div>

      {/* ── Chocolate Cake Body ── */}
      <div className="relative z-10" style={{ width: 200 }}>

        {/* Ganache drips on top */}
        <div className="relative h-6 -mb-1" style={{ zIndex: 25 }}>
          {[15, 35, 55, 72, 88].map((left, i) => (
            <div key={i} className="absolute top-0 rounded-b-full"
              style={{
                left: `${left}%`, width: 10 + (i % 2) * 4,
                height: 18 + (i % 3) * 6,
                background: 'linear-gradient(to bottom, #1a0a00, #3d1a00)',
              }}
            />
          ))}
        </div>

        {/* Cream frosting ring */}
        <div className="relative z-20" style={{ background: '#f5f5f0', height: 14, borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 2, paddingLeft: 4, paddingRight: 4 }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: '#fffdf7', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          ))}
        </div>

        {/* Top chocolate tier */}
        <motion.div
          animate={isCut ? { x: 0 } : {}}
          className="relative overflow-hidden"
          style={{ height: 54, background: 'linear-gradient(135deg, #3d1a00 0%, #6b2d00 50%, #3d1a00 100%)' }}
        >
          {/* chocolate texture lines */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 opacity-20"
              style={{ left: `${i * 18 + 5}%`, width: 2, background: '#1a0a00' }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />

          {/* Cut slice highlight */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                className="absolute top-0 bottom-0 origin-top"
                style={{ right: 30, width: 36, background: 'rgba(0,0,0,0.25)', transform: 'skewX(-8deg)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Middle cream layer */}
        <div style={{ height: 10, background: 'linear-gradient(to right, #fffdf7, #f0ece0)' }} />

        {/* Bottom chocolate tier */}
        <motion.div
          animate={isCut ? { x: 0 } : {}}
          className="relative overflow-hidden shadow-2xl"
          style={{ height: 70, background: 'linear-gradient(135deg, #2c1200 0%, #5c2800 50%, #2c1200 100%)', borderRadius: '0 0 12px 12px', boxShadow: '0 8px 32px rgba(30,10,0,0.5)' }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 opacity-15"
              style={{ left: `${i * 13 + 2}%`, width: 2, background: '#1a0a00' }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />

          {/* Bottom cut slice */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                className="absolute top-0 bottom-0 origin-top"
                style={{ right: 30, width: 36, background: 'rgba(0,0,0,0.3)', transform: 'skewX(-8deg)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Slice that splits off */}
      <AnimatePresence>
        {isCut && (
          <motion.div
            className="absolute z-[15]"
            style={{ bottom: 62, right: 10, width: 36, display: 'flex', flexDirection: 'column' }}
            initial={{ x: 0, rotate: 0, opacity: 0 }}
            animate={{ x: 24, rotate: 12, opacity: 1 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.4, delay: 0.2 }}
          >
            <div style={{ height: 54, background: 'linear-gradient(135deg,#5c2800,#8b4000)', borderRadius: '4px 4px 0 0' }} />
            <div style={{ height: 10, background: '#fffdf7' }} />
            <div style={{ height: 70, background: 'linear-gradient(135deg,#3d1800,#6b2d00)', borderRadius: '0 0 4px 4px' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plate */}
      <div className="w-56 h-5 rounded-[100%] absolute blur-[1px] shadow-lg" style={{ bottom: -10, background: 'rgba(255,255,255,0.3)' }} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAction}
        className="mt-12 glass-panel px-6 py-3 rounded-full text-white font-sans font-bold shadow-lg uppercase tracking-wider text-sm transition-colors"
        style={{ borderColor: 'rgba(255,255,255,0.4)', background: candlesBlown && !isCut ? 'rgba(92,40,0,0.6)' : 'rgba(219,39,119,0.4)' }}
      >
        {!candlesBlown ? 'Blow the Candles!' : isCut ? '🍫 Delicious!' : '🔪 Cut the Cake!'}
      </motion.button>
    </div>
  );
};




export default function App() {
  const [scene, setScene] = useState<'intro' | 'wish' | 'main'>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const [cakeKey, setCakeKey] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleBlowCandles = () => {
    playFirecrackerSound();
    setIsBlowing(true);
    setTimeout(() => setIsBlowing(false), 20000);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const triggerConfetti = () => {
    const duration = 8 * 1000; // Increased duration for fireworks effect
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      zIndex: 100,
      colors: ['#ffffff', '#06b6d4', '#22d3ee', '#ff4d8d', '#ec4899', '#a5f3fc', '#67e8f9', '#f9a8d4', '#0891b2', '#be185d']
    };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const intervalId = window.setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return window.clearInterval(intervalId);
      }

      const particleCount = 60 * (timeLeft / duration);
      // Create bursts from multiple random locations like firecrackers
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleOpen = () => {
    triggerConfetti();
    setScene('wish');
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio autoplay blocked:", e));
    }

    setTimeout(() => {
      setScene('main');
    }, 5000); // 5 seconds showing the big wish
  };

  const reasons = [
    { icon: <Heart size={24} className="text-white" fill="currentColor" />, title: "Your beautiful heart", desc: "The way you care for everyone around you." },
    { icon: <Sparkles size={24} className="text-white" />, title: "That stunning smile", desc: "It lights up my entire world the moment I see it." },
    { icon: <Star size={24} className="text-white" fill="currentColor" />, title: "Your weird jokes", desc: "Because you always know exactly how to make me laugh." },
    { icon: <Coffee size={24} className="text-white" />, title: "Our quiet moments", desc: "Doing absolutely nothing together is my favorite thing to do." }
  ];

  return (
    <>
      {/* Audio element & floating control */}
      <audio
        ref={audioRef}
        loop
        src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Happy_Birthday_to_You_%28instrumental%29.ogg"
        preload="auto"
      />

      {scene !== 'intro' && (
        <button
          onClick={toggleAudio}
          className="fixed top-6 right-6 z-50 glass-panel p-3 rounded-full text-white hover:bg-white/30 transition-colors shadow-lg"
        >
          {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      {/* Global Background */}
      <div className="mesh-gradient"></div>
      <motion.div
        className="fixed inset-0 pointer-events-none z-[0] bg-white/20"
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <TwinklingStars />
      <FloatingHearts />
      {scene !== 'intro' && <FloatingBalloons />}

      {/* Dark overlay + continuous firecrackers when candles are blown */}
      <AnimatePresence>
        {isBlowing && (
          <motion.div
            className="fixed inset-0 z-[50] bg-black/82 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      <FirecrackerParticles active={isBlowing} />

      {scene === 'intro' && (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden z-10 w-full px-4 py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 sm:p-10 flex flex-col items-center justify-center w-full max-w-sm rounded-[32px] sm:rounded-[40px] text-center"
          >
            <div className="flex justify-center mb-5">
              <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-white/90 animate-bounce" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2 drop-shadow-sm">I have something for you...</h1>
            <p className="text-white/80 mb-7 font-sans font-medium text-base sm:text-lg tracking-wide">Are you ready?</p>
            <button
              onClick={handleOpen}
              className="glass-panel px-8 py-4 rounded-full text-white font-sans font-bold hover:bg-white/20 transition-all uppercase tracking-widest text-xs w-full shadow-lg"
            >
              Tap to Open
            </button>
          </motion.div>
        </div>
      )}

      {scene === 'wish' && (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden z-20 w-full px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="glass-panel p-8 sm:p-12 md:p-20 rounded-[32px] sm:rounded-[40px] max-w-2xl mx-auto shadow-2xl"
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white font-bold mb-4 sm:mb-6 drop-shadow-lg">Happy Birthday!</h1>
            <p className="font-sans text-base sm:text-xl md:text-2xl text-white/90 italic drop-shadow-sm leading-relaxed tracking-wide">
              "You make every day brighter just by being in it. Here's to you, <span className="font-bold underline decoration-pink-300 underline-offset-4">KANMANI</span>."
            </p>
          </motion.div>
        </div>
      )}

      {scene === 'main' && (
        <div className={`min-h-screen relative overflow-hidden pb-32 ${isBlowing ? 'z-[60]' : 'z-10'}`}>

          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl text-white font-bold mb-6 sm:mb-8 leading-tight drop-shadow-sm">
                Happy <br />
                <span className="text-white/90 italic font-medium">&amp;</span> Beautiful <br />
                Birthday
              </h1>
              <p className="font-sans tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-2 mb-6 sm:mb-8 text-xl sm:text-2xl md:text-4xl font-bold text-white/90">
                KANMANI(Azhagi)
              </p>
              <p className="text-white/90 text-base sm:text-xl max-w-lg mx-auto italic font-serif leading-relaxed drop-shadow-sm px-2">
                "To the one who makes every day feel like a celebration. May your day be as beautiful, kind, and radiant as you are."
              </p>
            </motion.div>
          </section>

          {/* Gallery Section */}
          <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold drop-shadow-sm mb-10 sm:mb-16"
            >
              A Million Reasons to Love You <br /><span className="text-white/90 italic font-light">Kanmani❤️</span>
            </motion.h2>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
              {[
                { img: "/images/img5.jpeg", title: "Beautiful Moments", height: "h-64" },
                { img: "/images/img2.jpeg", title: "Coffee Dates", height: "h-96" },
                { img: "/images/img3.jpeg", title: "Your Smile", height: "h-48" },
                { img: "/images/img4.jpeg", title: "Perfect Evenings", height: "h-80" },
                { img: "/images/img1.jpeg", title: "Adventures", height: "h-52" },
                { img: "/images/img10.jpeg", title: "Golden Hour", height: "h-64" },
                { img: "/images/img7.jpeg", title: "Wanderlust", height: "h-48" },
                { img: "/images/img8.jpeg", title: "City Lights", height: "h-72" },
                { img: "/images/img9.jpeg", title: "Sunrise", height: "h-52" },
                { img: "/images/img6.jpeg", title: "Our Journey", height: "h-96" },
                { img: "/images/img11.jpeg", title: "Sweet Escape", height: "h-48" },
                { img: "/images/img12.jpeg", title: "Forever Us", height: "h-80" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.15, duration: 0.6 }}
                  className="glass-panel p-3 rounded-[32px] overflow-hidden group hover:bg-white/40 transition-all duration-300 break-inside-avoid relative inline-block w-full mb-6"
                >
                  <div className={`relative w-full ${item.height} rounded-[24px] overflow-hidden shadow-inner`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-pink-500/20 to-transparent z-10 opacity-70 mix-blend-overlay"></div>
                    <div className="absolute bottom-4 left-0 w-full text-center z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="glass-panel backdrop-blur-md px-6 py-3 rounded-full font-sans text-white font-medium text-xs tracking-widest uppercase drop-shadow-md border border-white/40">
                        {item.title}
                      </span>
                    </div>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Love Letter Section */}
          <section className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-7 sm:p-10 md:p-16 rounded-[32px] sm:rounded-[40px] flex flex-col justify-center"
            >
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 mx-auto mb-6 sm:mb-8 animate-pulse" fill="currentColor" />
              <div className="font-serif text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed text-center space-y-5 sm:space-y-6">
                <p>
                  I wanted to make something special for you today, because "special" is exactly what you are to me.
                </p>
                <p>
                  Every single day with you feels like a gift. You bring so much color, joy, and warmth into my life that I honestly don't know what I did to deserve you.
                </p>
                <p>
                  I hope this year brings you as much happiness as you give to everyone around you. I can't wait to celebrate many more birthdays by your side.
                </p>
                <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 flex items-center justify-center text-white relative">
                    <Heart size={18} fill="currentColor" />
                    <div className="absolute inset-0 rounded-full border border-white/50 scale-110"></div>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-[0.2em]">With all my love</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Reasons Section */}
          <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold drop-shadow-sm mb-10 sm:mb-16"
            >
              Just a few reasons why <br /><span className="text-white/90 italic font-light">I adore you</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
              {reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="glass-panel p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] text-left group hover:bg-white/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-opacity-10 scale-150 text-white/10 transform rotate-12 transition-transform group-hover:scale-125">
                    {reason.icon}
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner relative z-10">
                    {reason.icon}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 sm:mb-3 font-semibold relative z-10">{reason.title}</h3>
                  <p className="font-sans text-white/80 leading-relaxed text-sm relative z-10">{reason.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Video Section */}
          <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold drop-shadow-sm mb-10 sm:mb-16"
            >
              A Special Message <br /><span className="text-white/90 italic font-light">Just for You</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-2 sm:p-4 rounded-[28px] sm:rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="relative w-full aspect-video rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black/30 shadow-inner">
                <video
                  className="w-full h-full object-cover"
                  controls
                  loop
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/video/video1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </section>

          {/* Cake Section */}
          <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold drop-shadow-sm mb-14 sm:mb-24"
            >
              Make a Wish <br /><span className="text-white/90 italic font-light">Cut the Cake</span>
            </motion.h2>

            <AnimatedCake key={cakeKey} onCut={triggerConfetti} onBlow={handleBlowCandles} />
          </section>

          {/* Footer interaction */}
          <section className="relative py-16 sm:py-24 text-center px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12 w-full sm:w-auto"
            >
              <button
                onClick={() => { triggerConfetti(); setCakeKey(k => k + 1); }}
                className="glass-panel w-full sm:w-auto px-8 py-4 rounded-full text-white font-sans font-bold hover:bg-white/30 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                Celebrate Again
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              </button>
            </motion.div>

            <div className="glass-panel px-8 sm:px-10 py-5 sm:py-6 rounded-[28px] sm:rounded-[32px] inline-flex flex-col items-center">
              <p className="text-white/70 font-sans text-xs uppercase tracking-[0.4em] mb-2">For You, Always</p>
              <p className="text-white font-bold font-serif text-xl sm:text-2xl leading-tight">KANMANI</p>
            </div>
          </section>

        </div>
      )}
    </>
  );
}
