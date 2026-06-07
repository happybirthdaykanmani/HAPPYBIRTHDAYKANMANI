import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, Coffee, Music, VolumeX, X, ChevronLeft, ChevronRight, ChevronDown, Smile, Sun, Flame, MessageCircle } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT PARTICLES
══════════════════════════════════════════════════════════════════════ */
const FloatingHearts = () => {
  const hearts = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 12,
      size: Math.random() * 40 + 16,
      opacity: Math.random() * 0.12 + 0.05,
    }))
  ).current;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(h => (
        <motion.div key={h.id} className="absolute bottom-[-60px]" style={{ left: h.left }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: '-115vh', x: [0, 35, -35, 0], opacity: [0, h.opacity, h.opacity, 0], rotate: [0, -12, 12, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          <Heart fill="currentColor" className="text-pink-500" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
};

const TwinklingStars = () => {
  const stars = useRef(
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      size: Math.random() * 2.5 + 0.7,
    }))
  ).current;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(s => (
        <motion.div key={s.id} className="absolute bg-white rounded-full"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, boxShadow: '0 0 6px rgba(255,255,255,0.8)' }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const FloatingBalloons = ({ burst }: { burst: boolean }) => {
  const balloonColors = ['#ff4d8d', '#06b6d4', '#22d3ee', '#ec4899', '#ffffff', '#a855f7', '#fbbf24', '#34d399'];
  const balloons = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: burst ? Math.random() * 0.6 : Math.random() * 10,
      duration: Math.random() * 12 + 14,
      scale: Math.random() * 0.7 + 0.6,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    }))
  ).current;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map(b => (
        <motion.div key={b.id} className="absolute bottom-[-150px]"
          style={{ left: b.left, transform: `scale(${b.scale})` }}
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: '-125vh', x: [0, 28, -28, 0], opacity: [0, 0.92, 0.92, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: burst ? 0 : Infinity, ease: 'linear' }}
        >
          <svg width="58" height="88" viewBox="0 0 40 90" fill="none">
            <path d="M20 0C8.95 0 0 10.74 0 24s10 24 20 24 20-10.74 20-24S31.05 0 20 0z" fill={b.color} />
            <path d="M18 48h4l-2 4-2-4z" fill={b.color} />
            <path d="M20 52C20 65 10 75 20 90" stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" />
            <path d="M10 14C10 14 15 6 25 8" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   FIRECRACKER PARTICLES
══════════════════════════════════════════════════════════════════════ */
type Burst = { id: number; x: number; y: number; color: string; delay: number };

const FirecrackerParticles = ({ active }: { active: boolean }) => {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const colors = ['#ff4d8d', '#06b6d4', '#22d3ee', '#ffffff', '#ec4899', '#67e8f9', '#f472b6', '#0891b2', '#a5f3fc', '#fbbf24'];
  useEffect(() => {
    if (!active) { setBursts([]); return; }
    const fire = () => setBursts(prev => [...prev.slice(-40), ...Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i + Math.random() * 99999,
      x: Math.random() * 85 + 5,
      y: Math.random() * 65 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.2,
    }))]);
    fire();
    const iv = setInterval(fire, 600);
    return () => clearInterval(iv);
  }, [active]);
  if (!bursts.length) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[70]">
      {bursts.map(b => (
        <div key={b.id} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          <motion.div className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ width: 18, height: 18, backgroundColor: b.color, boxShadow: `0 0 30px ${b.color}` }}
            initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.4, delay: b.delay }}
          />
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i / 16) * 360;
            const dist = Math.random() * 110 + 55;
            return (
              <motion.div key={i} className="absolute rounded-full"
                style={{ width: 5, height: 5, backgroundColor: b.color, boxShadow: `0 0 8px ${b.color}` }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos((angle * Math.PI) / 180) * dist, y: Math.sin((angle * Math.PI) / 180) * dist, opacity: 0, scale: 0 }}
                transition={{ duration: 1 + Math.random() * 0.5, delay: b.delay, ease: 'easeOut' }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   WELCOME / INTRO SCREEN  (Phase 0)
══════════════════════════════════════════════════════════════════════ */
const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => {
  // Slowly rotating love orbs
  const orbs = [
    { color: '#ff4d8d55', size: 420, x: '15%', y: '20%', dur: 8 },
    { color: '#06b6d444', size: 360, x: '80%', y: '70%', dur: 10 },
    { color: '#a855f733', size: 500, x: '60%', y: '15%', dur: 12 },
    { color: '#fbbf2422', size: 300, x: '5%', y: '75%', dur: 9 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0d0520 0%, #07071a 60%, #020210 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient orbs */}
      {orbs.map((o, i) => (
        <motion.div key={i} className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ width: o.size, height: o.size, background: o.color, left: o.x, top: o.y, transform: 'translate(-50%,-50%)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
        />
      ))}

      {/* Stars on this screen */}
      {Array.from({ length: 70 }).map((_, i) => (
        <motion.div key={i} className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: Math.random() * 2.5 + 0.5, height: Math.random() * 2.5 + 0.5,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      {/* Floating hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, bottom: -40 }}
          animate={{ y: '-110vh', opacity: [0, 0.15, 0.15, 0] }}
          transition={{ duration: Math.random() * 8 + 10, delay: Math.random() * 5, repeat: Infinity, ease: 'linear' }}
        >
          <Heart fill="currentColor" className="text-pink-400" size={Math.random() * 30 + 15} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Icon */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: 'radial-gradient(circle at 35% 35%, #ec4899, #be185d)', boxShadow: '0 0 40px rgba(236,72,153,0.5), 0 0 80px rgba(236,72,153,0.2)' }}
              animate={{ boxShadow: ['0 0 40px rgba(236,72,153,0.5)', '0 0 70px rgba(236,72,153,0.8)', '0 0 40px rgba(236,72,153,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={44} fill="white" className="text-white" />
            </motion.div>
            {/* Orbiting sparkles */}
            {[0, 1, 2, 3].map(i => (
              <motion.div key={i} className="absolute"
                style={{ width: 10, height: 10, top: '50%', left: '50%' }}
                animate={{ rotate: [i * 90, i * 90 + 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
              >
                <div style={{ transform: 'translate(-50%, -50%) translateX(52px)' }}>
                  <Sparkles size={12} className="text-amber-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Heading */}
        <motion.p
          className="text-white/50 uppercase tracking-[0.5em] text-xs font-sans mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          You've been invited to
        </motion.p>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-snug"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #ec4899, #fbbf24, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.4))',
          }}
        >
          Enter the World<br />Where You're<br />Loved Most
        </motion.h1>

        <motion.p
          className="text-white/45 font-serif italic text-base sm:text-lg mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          A little universe made just for you, with all my heart 💕
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 60px rgba(236,72,153,0.8)' }}
          whileTap={{ scale: 0.94 }}
          className="relative px-10 py-5 rounded-full font-sans font-bold text-white uppercase tracking-widest text-sm cursor-pointer overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)',
            boxShadow: '0 0 30px rgba(236,72,153,0.5)',
          }}
        >
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, white, transparent)', skewX: '-20deg' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          ✨ Enter My World ✨
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   BIRTHDAY MESSAGE SCREEN  (Phase 1)
══════════════════════════════════════════════════════════════════════ */
const BirthdayMessageScreen = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState<'msg1' | 'msg2' | 'both'>('msg1');

  useEffect(() => {
    // After 1.5s show second line
    const t1 = setTimeout(() => setStep('msg2'), 1500);
    // After 3s show together
    const t2 = setTimeout(() => setStep('both'), 3000);
    // After 5s call onDone
    const t3 = setTimeout(() => onDone(), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const letterVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.4, delay: i * 0.06, type: 'spring' as const, bounce: 0.4 },
    }),
  };

  const line1 = 'Happy Birthday';
  const line2 = 'This is for you, Kanmani 🌸';

  return (
    <motion.div
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0a0018 0%, #040010 70%, #020208 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dark vignette top & bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Burst rings emanating from center */}
      {[1, 2, 3, 4].map(i => (
        <motion.div key={i} className="absolute rounded-full border border-pink-500/30 pointer-events-none"
          style={{ width: 100, height: 100 }}
          animate={{ scale: [1, i * 4 + 2], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Flying sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 6 + 3, height: Math.random() * 6 + 3,
            background: ['#ff4d8d', '#fbbf24', '#06b6d4', '#a855f7', '#ffffff'][Math.floor(Math.random() * 5)],
            left: '50%', top: '50%',
            boxShadow: '0 0 8px currentColor',
          }}
          animate={{
            x: (Math.random() - 0.5) * window.innerWidth * 1.5,
            y: (Math.random() - 0.5) * window.innerHeight * 1.5,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: Math.random() * 2 + 1.5, delay: Math.random() * 0.5, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Line 1: Happy Birthday — letter-by-letter */}
        <AnimatePresence>
          {(step === 'msg1' || step === 'msg2' || step === 'both') && (
            <motion.div
              className="overflow-hidden mb-4"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {line1.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-serif font-bold inline-block"
                    style={{
                      fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                      lineHeight: 1.1,
                      background: 'linear-gradient(135deg, #ec4899, #fbbf24)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.6))',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Line 2: This is for you, Kanmani */}
        <AnimatePresence>
          {(step === 'msg2' || step === 'both') && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-4 sm:mt-6"
            >
              <p
                className="font-love leading-tight"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                  background: 'linear-gradient(135deg, #06b6d4, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.5))',
                }}
              >
                This is for you,
              </p>
              <motion.p
                className="font-love leading-tight mt-1"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 8rem)',
                  background: 'linear-gradient(135deg, #ec4899, #fbbf24, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.7))',
                }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Kanmani 🌸
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hearts row */}
        <AnimatePresence>
          {step === 'both' && (
            <motion.div
              className="flex justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[...Array(7)].map((_, i) => (
                <motion.div key={i}
                  animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                >
                  <Heart fill="currentColor" className="text-pink-400" size={16 + i * 2} style={{ opacity: 0.4 + i * 0.08 }} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer bar */}
        <motion.div className="mt-10 mx-auto h-0.5 rounded-full overflow-hidden"
          style={{ width: 120, background: 'rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <motion.div className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ec4899, #06b6d4)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4.5, ease: 'linear', delay: 0.5 }}
          />
        </motion.div>
        <motion.p className="mt-2 text-white/25 text-xs font-sans tracking-widest"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        >
          your celebration awaits...
        </motion.p>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED BIRTHDAY CAKE
══════════════════════════════════════════════════════════════════════ */
const flameVariants = {
  visible: { scale: [1, 1.2, 1] as number[], opacity: 1, rotate: [-5, 5, -5] as number[], transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' as const } },
  blown: { x: 45, scaleX: 2.5, scaleY: 0, opacity: 0, rotate: 65, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const AnimatedCake = ({ onCut, onBlow, onDone }: { onCut: () => void; onBlow: () => void; onDone: () => void }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [showDoneHint, setShowDoneHint] = useState(false);

  const handleAction = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      onBlow();
    } else if (!isCut && !isCutting) {
      setIsCutting(true);
      setTimeout(() => { setIsCut(true); onCut(); }, 900);
      setTimeout(() => { setIsCutting(false); setShowDoneHint(true); }, 1600);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-auto flex flex-col items-center justify-end" style={{ width: 220, height: 290 }}>
        {/* Knife */}
        <AnimatePresence>
          {isCutting && (
            <motion.div className="absolute z-30 flex flex-col items-center" style={{ top: -80, left: '55%' }}
              initial={{ y: -60, rotate: -8, opacity: 0 }}
              animate={{ y: [0, 110, 110, -60], rotate: [-8, -5, -5, -8], opacity: [1, 1, 1, 0] }}
              transition={{ duration: 1.6, times: [0, 0.45, 0.65, 1], ease: 'easeInOut' }}
            >
              <svg width="28" height="110" viewBox="0 0 28 110" fill="none">
                <path d="M14 0 L22 90 L14 100 L6 90 Z" fill="url(#bladeGrad3)" />
                <path d="M14 100 L12 110 L16 110 Z" fill="#aaa" />
                <defs>
                  <linearGradient id="bladeGrad3" x1="0" y1="0" x2="28" y2="110" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e8e8e8" />
                    <stop offset="60%" stopColor="#c0c0c0" />
                    <stop offset="100%" stopColor="#888" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-7 h-10 rounded-md" style={{ background: 'linear-gradient(to bottom, #5c3317, #3b1f0e)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Candles */}
        <AnimatePresence>
          {!isCutting && !isCut && (
            <motion.div className="flex gap-5 mb-[-8px] z-20"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            >
              {[0, 1, 2].map(ci => (
                <div key={ci} className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {!candlesBlown && (
                      <motion.div variants={flameVariants} initial={{ scale: 0.8, opacity: 0 }} animate="visible" exit="blown"
                        className="w-4 h-7 rounded-full blur-[1px] absolute -top-9 origin-bottom"
                        style={{ background: 'linear-gradient(to top, #f97316, #facc15, #fef9c3)' }}
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {candlesBlown && (
                      <motion.div key={`smoke-${ci}`}
                        initial={{ opacity: 0.7, y: 0, scaleX: 0.8, scaleY: 0.5 }}
                        animate={{ opacity: 0, y: -44, scaleX: 3, scaleY: 2 }} exit={{}}
                        transition={{ duration: 1.8, ease: 'easeOut', delay: ci * 0.08 }}
                        className="w-2 h-3 bg-white/40 rounded-full blur-[3px] absolute -top-8 origin-bottom"
                      />
                    )}
                  </AnimatePresence>
                  <div className="w-3.5 h-14 rounded-t-sm shadow-sm overflow-hidden"
                    style={{ background: `repeating-linear-gradient(to bottom, ${['#ff4d8d', '#06b6d4', '#a855f7'][ci]} 0px, ${['#ff4d8d', '#06b6d4', '#a855f7'][ci]} 4px, #fff 4px, #fff 8px)` }}
                  />
                  <div className="w-3.5 h-2 mt-[-2px]" style={{ background: '#78350f' }} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake body */}
        <div className="relative z-10" style={{ width: 210 }}>
          <div className="relative h-7 -mb-1" style={{ zIndex: 25 }}>
            {[10, 28, 46, 64, 80].map((l, i) => (
              <div key={i} className="absolute top-0 rounded-b-full"
                style={{ left: `${l}%`, width: 12 + (i % 2) * 4, height: 20 + (i % 3) * 6, background: 'linear-gradient(to bottom, #1a0a00, #3d1a00)' }}
              />
            ))}
          </div>
          <div style={{ background: '#f5f5f0', height: 16, borderRadius: '14px 14px 0 0', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 3, paddingLeft: 5, paddingRight: 5 }}>
            {[...Array(8)].map((_, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: '#fffdf7', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />)}
          </div>
          <motion.div className="relative overflow-hidden" style={{ height: 58, background: 'linear-gradient(135deg, #3d1a00, #6b2d00, #3d1a00)' }}>
            {[...Array(7)].map((_, i) => <div key={i} className="absolute top-0 bottom-0 opacity-20" style={{ left: `${i * 15 + 5}%`, width: 2, background: '#1a0a00' }} />)}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.08), transparent 50%)' }} />
            <AnimatePresence>
              {isCut && <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} className="absolute top-0 bottom-0 origin-top" style={{ right: 32, width: 38, background: 'rgba(0,0,0,0.25)', transform: 'skewX(-8deg)' }} />}
            </AnimatePresence>
          </motion.div>
          <div style={{ height: 12, background: 'linear-gradient(to right, #fffdf7, #f0ece0)' }} />
          <motion.div className="relative overflow-hidden shadow-2xl" style={{ height: 76, background: 'linear-gradient(135deg, #2c1200, #5c2800, #2c1200)', borderRadius: '0 0 14px 14px', boxShadow: '0 8px 36px rgba(30,10,0,0.6)' }}>
            {[...Array(9)].map((_, i) => <div key={i} className="absolute top-0 bottom-0 opacity-[0.12]" style={{ left: `${i * 12 + 2}%`, width: 2, background: '#1a0a00' }} />)}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent 50%)' }} />
            <AnimatePresence>
              {isCut && <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} className="absolute top-0 bottom-0 origin-top" style={{ right: 32, width: 38, background: 'rgba(0,0,0,0.3)', transform: 'skewX(-8deg)' }} />}
            </AnimatePresence>
          </motion.div>
        </div>
        <AnimatePresence>
          {isCut && (
            <motion.div className="absolute z-[15]" style={{ bottom: 68, right: 8, width: 38, display: 'flex', flexDirection: 'column' }}
              initial={{ x: 0, rotate: 0, opacity: 0 }}
              animate={{ x: 26, rotate: 14, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.4, delay: 0.2 }}
            >
              <div style={{ height: 58, background: 'linear-gradient(135deg,#5c2800,#8b4000)', borderRadius: '4px 4px 0 0' }} />
              <div style={{ height: 12, background: '#fffdf7' }} />
              <div style={{ height: 76, background: 'linear-gradient(135deg,#3d1800,#6b2d00)', borderRadius: '0 0 4px 4px' }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-60 h-5 rounded-[100%] absolute blur-[1px] shadow-lg" style={{ bottom: -12, background: 'rgba(255,255,255,0.28)' }} />
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
          onClick={handleAction}
          style={{ minWidth: 220 }}
          className={`px-8 py-4 rounded-full text-white font-sans font-bold uppercase tracking-widest text-sm cursor-pointer transition-all duration-300 ${
            !candlesBlown
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_25px_rgba(245,158,11,0.5)]'
              : isCut
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_25px_rgba(6,182,212,0.5)]'
              : 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-[0_0_25px_rgba(244,63,94,0.5)]'
          }`}
        >
          {!candlesBlown ? '🕯️ Blow the Candles!' : isCut ? '🍫 Delicious!' : '🔪 Cut the Cake!'}
        </motion.button>

        <AnimatePresence>
          {showDoneHint && (
            <motion.button onClick={onDone}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-sm font-semibold text-white cursor-pointer uppercase tracking-widest"
              style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)', boxShadow: '0 0 20px rgba(236,72,153,0.5)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Enter the celebration ✨ <ChevronDown size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   GALLERY DATA
══════════════════════════════════════════════════════════════════════ */
const galleryItems = [
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img5.jpeg`, title: 'Beautiful Moments', height: 'h-64' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img2.jpeg`, title: 'Coffee Dates', height: 'h-96' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img3.jpeg`, title: 'Your Smile', height: 'h-48' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img4.jpeg`, title: 'Perfect Evenings', height: 'h-80' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img1.jpeg`, title: 'Adventures', height: 'h-52' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img10.jpeg`, title: 'Golden Hour', height: 'h-64' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img7.jpeg`, title: 'Wanderlust', height: 'h-48' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img8.jpeg`, title: 'City Lights', height: 'h-72' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img9.jpeg`, title: 'Sunrise', height: 'h-52' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img6.jpeg`, title: 'Our Journey', height: 'h-96' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img11.jpeg`, title: 'Sweet Escape', height: 'h-48' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img12.jpeg`, title: 'Forever Us', height: 'h-80' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video7.mp4`, title: 'Funny Side', height: 'h-64' },
];

const weTogetherItems = [
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video1.mp4`, title: 'Our Special Movie', height: 'h-96' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img13.jpeg`, title: 'Happy Times', height: 'h-64' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img14.jpeg`, title: 'Sweet Smiles', height: 'h-48' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img15.jpeg`, title: 'Warm Embraces', height: 'h-80' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img16.jpeg`, title: 'Together Always', height: 'h-52' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img17.jpeg`, title: 'Beautiful Days', height: 'h-64' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video6.mp4`, title: 'Special Memories', height: 'h-72' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video4.mp4`, title: 'Laughter & Joy', height: 'h-52' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img21.jpeg`, title: 'Always You', height: 'h-52' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img20.jpeg`, title: 'Perfect Moments', height: 'h-96' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video2.mp4`, title: 'Side by Side', height: 'h-48' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video5.mp4`, title: 'Hearts Connected', height: 'h-80' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video3.mp4`, title: 'Pure Happiness', height: 'h-64' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video10.mp4`, title: 'Forever & Ever', height: 'h-52' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img24.jpeg`, title: 'Cherished Times', height: 'h-72' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img23.jpeg`, title: 'True Love', height: 'h-96' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video9.mp4`, title: 'Endless Memories', height: 'h-48' },
  { type: 'image', src: `${import.meta.env.BASE_URL}images/img22.jpeg`, title: 'Our Little World', height: 'h-64' },
  { type: 'video', src: `${import.meta.env.BASE_URL}video/video8.mp4`, title: 'Infinite Love', height: 'h-72' },
];

/* ═══════════════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════════════════ */
const Lightbox = ({ item, onClose, onNext, onPrev }: {
  item: { type: string; src: string; title: string };
  onClose: () => void; onNext: () => void; onPrev: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onNext, onPrev, onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
    >
      <button onClick={onClose} className="absolute top-5 right-5 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors"><X size={22} /></button>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors"><ChevronLeft size={22} /></button>
      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors"><ChevronRight size={22} /></button>
      <motion.div initial={{ scale: 0.93, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93 }}
        onClick={e => e.stopPropagation()}
        className="flex flex-col items-center max-w-5xl max-h-[88vh]"
      >
        {item.type === 'video'
          ? <video src={item.src} controls autoPlay playsInline className="max-w-full max-h-[78vh] rounded-xl shadow-2xl border border-white/10" />
          : <img src={item.src} alt={item.title} className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl border border-white/10" />
        }
        <p className="mt-4 font-serif text-xl text-white font-bold tracking-wide">{item.title}</p>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   REASONS DATA
══════════════════════════════════════════════════════════════════════ */
const reasons = [
  { icon: (cls?: string) => <Heart className={cls || 'text-white'} size={24} fill="currentColor" />, title: 'Your beautiful heart', desc: 'The way you care for everyone around you.', themeClass: 'glass-panel-rose', iconBg: 'bg-rose-500/20 text-rose-300', titleColor: 'text-rose-100 group-hover:text-rose-300', descColor: 'text-rose-200/80', glowBg: 'text-rose-500/10' },
  { icon: (cls?: string) => <Sparkles className={cls || 'text-white'} size={24} />, title: 'That stunning smile', desc: 'It lights up my entire world the moment I see it.', themeClass: 'glass-panel-amber', iconBg: 'bg-amber-500/20 text-amber-300', titleColor: 'text-amber-100 group-hover:text-amber-300', descColor: 'text-amber-200/80', glowBg: 'text-amber-500/10' },
  { icon: (cls?: string) => <Star className={cls || 'text-white'} size={24} fill="currentColor" />, title: 'Your weird jokes', desc: 'Because you always know exactly how to make me laugh.', themeClass: 'glass-panel-cyan', iconBg: 'bg-cyan-500/20 text-cyan-300', titleColor: 'text-cyan-100 group-hover:text-cyan-300', descColor: 'text-cyan-200/80', glowBg: 'text-cyan-500/10' },
  { icon: (cls?: string) => <Coffee className={cls || 'text-white'} size={24} />, title: 'Our quiet moments', desc: 'Doing absolutely nothing together is my favourite thing.', themeClass: 'glass-panel-violet', iconBg: 'bg-violet-500/20 text-violet-300', titleColor: 'text-violet-100 group-hover:text-violet-300', descColor: 'text-violet-200/80', glowBg: 'text-violet-500/10' },
  { icon: (cls?: string) => <Flame className={cls || 'text-white'} size={24} />, title: 'Your comforting warmth', desc: 'How safe and at home I feel whenever I am near you.', themeClass: 'glass-panel-rose', iconBg: 'bg-rose-500/20 text-rose-300', titleColor: 'text-rose-100 group-hover:text-rose-300', descColor: 'text-rose-200/80', glowBg: 'text-rose-500/10' },
  { icon: (cls?: string) => <Sun className={cls || 'text-white'} size={24} />, title: 'You are my sunshine', desc: 'Brightening up even my darkest days with your warm presence.', themeClass: 'glass-panel-amber', iconBg: 'bg-amber-500/20 text-amber-300', titleColor: 'text-amber-100 group-hover:text-amber-300', descColor: 'text-amber-200/80', glowBg: 'text-amber-500/10' },
  { icon: (cls?: string) => <Smile className={cls || 'text-white'} size={24} />, title: 'Your infectious laughter', desc: 'The sweet sound that instantly puts a smile on my face.', themeClass: 'glass-panel-cyan', iconBg: 'bg-cyan-500/20 text-cyan-300', titleColor: 'text-cyan-100 group-hover:text-cyan-300', descColor: 'text-cyan-200/80', glowBg: 'text-cyan-500/10' },
  { icon: (cls?: string) => <MessageCircle className={cls || 'text-white'} size={24} />, title: 'Our endless conversations', desc: 'How we can talk for hours about everything and nothing at all.', themeClass: 'glass-panel-violet', iconBg: 'bg-violet-500/20 text-violet-300', titleColor: 'text-violet-100 group-hover:text-violet-300', descColor: 'text-violet-200/80', glowBg: 'text-violet-500/10' },
];

/* ═══════════════════════════════════════════════════════════════════
   SECTION LABELS
══════════════════════════════════════════════════════════════════════ */
const SECTION_LABELS = [
  'Birthday Cake 🎂',
  'Happy Birthday ✨',
  'Gallery 📸',
  'Love Letter 💌',
  'Why I Love You ❤️',
  'Special Video 🎬',
  'We Together 🫶',
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════════════ */
type Phase = 'welcome' | 'message' | 'sections';

export default function App() {
  const [phase, setPhase]               = useState<Phase>('welcome');
  const [currentSection, setCurrentSection] = useState(0);
  const [cakeComplete, setCakeComplete] = useState(false);
  const [isBlowing, setIsBlowing]       = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [direction, setDirection]       = useState<1 | -1>(1);
  const [cakeKey, setCakeKey]           = useState(0);
  const [activeMediaList, setActiveMediaList] = useState<{ type: string; src: string; title: string }[]>([]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(-1);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const totalSections = SECTION_LABELS.length;

  const triggerConfetti = useCallback(() => {
    const end = Date.now() + 7000;
    const colors = ['#ffffff', '#06b6d4', '#22d3ee', '#ff4d8d', '#ec4899', '#a5f3fc', '#f9a8d4', '#fbbf24', '#c084fc'];
    const fire = () => {
      if (Date.now() > end) return;
      confetti({ startVelocity: 35, spread: 360, ticks: 80, zIndex: 100, colors, particleCount: 55, origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() - 0.2 } });
      confetti({ startVelocity: 35, spread: 360, ticks: 80, zIndex: 100, colors, particleCount: 55, origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() - 0.2 } });
      setTimeout(fire, 260);
    };
    fire();
  }, []);

  // Phase transitions
  const handleEnter = useCallback(() => {
    setPhase('message');
    // Cracker sound on entering message
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/crackers.mp3`);
    audio.volume = 0.6;
    audio.play().catch(() => {});
    triggerConfetti();
  }, [triggerConfetti]);

  const handleMessageDone = useCallback(() => {
    setPhase('sections');
    // Cake slides in from right — section 0 already
  }, []);

  // Section navigation
  const goTo = useCallback((idx: number) => {
    if (idx === currentSection) return;
    if (!cakeComplete && idx > 0) return;
    setDirection(idx > currentSection ? 1 : -1);
    setCurrentSection(idx);
  }, [currentSection, cakeComplete]);

  const goNext = useCallback(() => goTo(Math.min(currentSection + 1, totalSections - 1)), [goTo, currentSection, totalSections]);
  const goPrev = useCallback(() => goTo(Math.max(currentSection - 1, 0)), [goTo, currentSection]);

  useEffect(() => {
    if (phase !== 'sections') return;
    const h = (e: KeyboardEvent) => {
      if (activeMediaIndex >= 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [phase, goNext, goPrev, activeMediaIndex]);

  const handleBlow = () => {
    setIsBlowing(true);
    setTimeout(() => setIsBlowing(false), 20000);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleCut = () => {
    triggerConfetti();
    setBalloonsActive(true);
  };

  const handleCakeDone = () => {
    setCakeComplete(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    triggerConfetti();
    setDirection(1);
    setCurrentSection(1);
  };

  const toggleCard = (idx: number) => {
    setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <>
      <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL}audio/crackers.mp3`} preload="auto" />

      {/* Always-on backgrounds */}
      <div className="mesh-gradient" />
      <motion.div className="fixed inset-0 pointer-events-none z-0 bg-white/10"
        animate={{ opacity: [0, 0.1, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <TwinklingStars />
      <FloatingHearts />
      {(balloonsActive || cakeComplete) && <FloatingBalloons burst={balloonsActive} />}


      <FirecrackerParticles active={isBlowing} />

      {/* ─────── PHASE: WELCOME ─────── */}
      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <WelcomeScreen key="welcome" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* ─────── PHASE: MESSAGE ─────── */}
      <AnimatePresence mode="wait">
        {phase === 'message' && (
          <BirthdayMessageScreen key="message" onDone={handleMessageDone} />
        )}
      </AnimatePresence>

      {/* ─────── PHASE: SECTIONS ─────── */}
      <AnimatePresence mode="wait">
        {phase === 'sections' && (
          <motion.div key="sections-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/* Music button */}
            {cakeComplete && (
              <button onClick={toggleAudio}
                className="fixed top-5 right-5 z-50 glass-panel p-3 rounded-full text-white hover:bg-white/20 transition-colors shadow-lg cursor-pointer"
              >
                {isPlaying ? <Music size={18} className="text-pink-400" /> : <VolumeX size={18} className="text-white/50" />}
              </button>
            )}

            {/* Dot navigation */}
            {cakeComplete && (
              <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
                {SECTION_LABELS.map((label, i) => (
                  <motion.button key={i} onClick={() => goTo(i)} className="relative group flex items-center justify-end" title={label}>
                    <span className="absolute right-6 whitespace-nowrap text-xs font-sans text-white/70 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{label}</span>
                    <motion.div className="rounded-full cursor-pointer transition-all duration-300"
                      animate={{ width: currentSection === i ? 10 : 7, height: currentSection === i ? 10 : 7, backgroundColor: currentSection === i ? '#ec4899' : 'rgba(255,255,255,0.35)', boxShadow: currentSection === i ? '0 0 10px #ec4899' : 'none' }}
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Section label */}
            {cakeComplete && (
              <motion.div
                key={currentSection}
                className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-widest text-white/60"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              >
                {SECTION_LABELS[currentSection]}
              </motion.div>
            )}

            {/* Arrow nav */}
            {cakeComplete && (
              <>
                <AnimatePresence>
                  {currentSection > 0 && (
                    <motion.button onClick={goPrev}
                      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 glass-panel p-3 rounded-full text-white cursor-pointer"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(236,72,153,0.2)' }} whileTap={{ scale: 0.92 }}
                    >
                      <ChevronLeft size={22} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {currentSection < totalSections - 1 && (
                    <motion.button onClick={goNext}
                      className="fixed right-16 top-1/2 -translate-y-1/2 z-50 glass-panel p-3 rounded-full text-white cursor-pointer"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(236,72,153,0.2)' }} whileTap={{ scale: 0.92 }}
                    >
                      <ChevronRight size={22} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* ── SECTION SLIDES ── */}
            <AnimatePresence custom={direction} mode="wait">

              {/* SECTION 0: CAKE — slides in from RIGHT on first load */}
              {currentSection === 0 && (
                <motion.div key="cake"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                  style={{ background: 'radial-gradient(ellipse at center, #0a0020 0%, #050015 60%, #020210 100%)' }}
                >
                  {/* Firecracker overlay specific to background */}
                  <AnimatePresence>
                    {isBlowing && (
                      <motion.div className="fixed inset-0 z-0 bg-black/95 pointer-events-none"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-widest mb-6 text-pink-300/80"
                        style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)' }}
                      >
                        <Sparkles size={12} /> 🎂 Happy Birthday Kanmani! <Sparkles size={12} />
                      </div>
                      <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold mb-4 leading-tight">
                        <span className="text-gradient-rose glow-text-pink">It's Your</span><br />
                        <span className="text-gradient-gold glow-text-gold">Special Day!</span>
                      </h1>
                      <p className="text-white/55 font-sans text-base sm:text-lg mb-10 max-w-sm mx-auto">
                        Blow the candles, cut the cake — and let the celebration begin! 🎉
                      </p>
                    </motion.div>

                    {/* Cake slides in from right */}
                    <motion.div
                      initial={{ x: '120%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    >
                      <AnimatedCake key={cakeKey} onCut={handleCut} onBlow={handleBlow} onDone={handleCakeDone} />
                    </motion.div>

                    {!cakeComplete && (
                      <motion.p className="mt-8 text-white/30 text-xs font-sans uppercase tracking-widest"
                        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        🔒 Cut the cake to unlock the full experience
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* SECTION 1: HERO */}
              {currentSection === 1 && (
                <motion.div key="hero"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 text-center">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                      <motion.div className="text-7xl sm:text-8xl mb-8"
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >🎂</motion.div>
                      <h1 className="font-serif text-5xl sm:text-6xl md:text-9xl font-bold mb-6 leading-tight">
                        <span className="text-gradient-rose glow-text-pink">Happy</span><br />
                        <span className="text-white/80 italic font-medium text-4xl sm:text-5xl md:text-6xl">&amp;</span>{' '}
                        <span className="text-gradient-cyan glow-text-cyan">Beautiful</span><br />
                        <span className="text-gradient-gold glow-text-gold">Birthday</span>
                      </h1>
                      <p className="font-sans mt-4 mb-8">
                        <span className="font-love text-5xl sm:text-6xl md:text-8xl text-gradient-pink-gold drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] tracking-normal normal-case inline-block animate-float">
                          KANMANI (Azhagi)
                        </span>
                      </p>
                      <p className="text-white/80 text-base sm:text-xl max-w-lg mx-auto italic font-serif leading-relaxed">
                        "To the one who makes every day feel like a{' '}
                        <span className="text-pink-300 font-semibold not-italic">celebration</span>. May your day be as{' '}
                        <span className="text-cyan-200 font-semibold not-italic">beautiful</span>,{' '}
                        <span className="text-rose-200 font-semibold not-italic">kind</span>, and{' '}
                        <span className="text-amber-200 font-semibold not-italic">radiant</span> as you are."
                      </p>
                      <motion.div className="mt-10 flex items-center justify-center gap-3"
                        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        {[...Array(5)].map((_, i) => <Heart key={i} size={16 + i * 3} fill="currentColor" className="text-pink-400" style={{ opacity: 0.4 + i * 0.12 }} />)}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 2: GALLERY */}
              {currentSection === 2 && (
                <motion.div key="gallery"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-14">
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-gradient-cyan">A Million Reasons to Love You</span>
                      </h2>
                      <span className="font-love font-normal text-4xl sm:text-5xl text-gradient-pink-gold glow-text-pink">Kanmani❤️</span>
                    </motion.div>
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
                      {galleryItems.map((item, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-30px' }} transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                          onClick={() => { setActiveMediaList(galleryItems); setActiveMediaIndex(i); }}
                          className="glass-panel p-2.5 rounded-[28px] overflow-hidden group hover:bg-white/[0.08] transition-all duration-300 break-inside-avoid relative inline-block w-full mb-5 cursor-pointer"
                          whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(236,72,153,0.25)' }}
                        >
                          <div className={`relative w-full ${item.height} rounded-[20px] overflow-hidden shadow-inner`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70" />
                            <div className="absolute bottom-3 left-0 w-full text-center z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                              <span className="glass-panel px-5 py-2 rounded-full font-sans text-white text-xs tracking-widest uppercase border border-white/30">{item.title}</span>
                            </div>
                            {item.type === 'video' ? (
                              <div className="w-full h-full relative">
                                <video src={item.src} muted loop autoPlay playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" />
                                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white/80">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                </div>
                              </div>
                            ) : (
                              <img src={item.src} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 3: LOVE LETTER */}
              {currentSection === 3 && (
                <motion.div key="letter"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="min-h-screen flex items-center justify-center px-4 py-24">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                      className="glass-panel-rose p-8 sm:p-12 md:p-16 rounded-[40px] max-w-2xl w-full shadow-[0_10px_60px_rgba(244,63,94,0.2)]"
                    >
                      <Heart className="w-12 h-12 text-pink-400 drop-shadow-[0_0_16px_rgba(244,63,94,0.7)] mx-auto mb-8 animate-pulse" fill="currentColor" />
                      <div className="font-serif text-lg sm:text-xl md:text-2xl text-white/93 leading-relaxed text-center space-y-6">
                        <p>I wanted to make something special for you today, because <span className="text-pink-300 font-semibold not-italic">"special"</span> is exactly what you are to me.</p>
                        <p>Every single day with you feels like a <span className="text-amber-300 font-semibold not-italic">gift</span>. You bring so much <span className="text-gradient-rainbow font-extrabold not-italic">color, joy, and warmth</span> into my life that I honestly don't know what I did to deserve you.</p>
                        <p>I hope this year brings you as much <span className="text-cyan-300 font-semibold not-italic">happiness</span> as you give to everyone around you. I can't wait to celebrate many more <span className="text-rose-300 font-semibold not-italic">birthdays</span> by your side.</p>
                        <div className="mt-12 flex items-center justify-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center relative shadow-lg">
                            <Heart size={18} fill="currentColor" className="text-white" />
                            <div className="absolute inset-0 rounded-full border border-pink-400/50 scale-110 animate-pulse" />
                          </div>
                          <span className="font-sans text-xs font-bold text-pink-200/80 uppercase tracking-[0.25em]">With all my love</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 4: REASONS */}
              {currentSection === 4 && (
                <motion.div key="reasons"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-24">
                    <div className="max-w-4xl w-full">
                      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-14">
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                          <span className="text-gradient-rose">Just a few reasons why</span><br />
                          <span className="text-gradient-pink-gold italic font-medium glow-text-pink">I adore you</span>
                        </h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
                          <span>Click each card to reveal my heart</span>
                          <Sparkles size={12} className="text-amber-300 animate-pulse" />
                        </p>
                      </motion.div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {reasons.map((r, i) => {
                          const isFlipped = !!flippedCards[i];
                          const getBackStyle = (theme: string) => {
                            switch (theme) {
                              case 'glass-panel-rose':
                                return { text: 'text-rose-200', border: 'border-rose-500/30' };
                              case 'glass-panel-amber':
                                return { text: 'text-amber-200', border: 'border-amber-500/30' };
                              case 'glass-panel-cyan':
                                return { text: 'text-cyan-200', border: 'border-cyan-500/30' };
                              case 'glass-panel-violet':
                                return { text: 'text-violet-200', border: 'border-violet-500/30' };
                              default:
                                return { text: 'text-pink-200', border: 'border-pink-500/30' };
                            }
                          };
                          const backStyle = getBackStyle(r.themeClass);
                          return (
                            <motion.div key={i}
                              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1, duration: 0.6 }}
                              className="w-full h-[240px] perspective-1000 cursor-pointer group"
                              onClick={() => toggleCard(i)}
                            >
                              <div
                                className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out"
                                style={{
                                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                }}
                              >
                                {/* FRONT SIDE */}
                                <div className={`absolute inset-0 backface-hidden p-7 sm:p-9 rounded-[32px] flex flex-col justify-between items-start ${r.themeClass} border border-white/10 shadow-lg hover:scale-[1.02] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden`}>
                                  {/* Decorative glowing background */}
                                  <div className={`absolute top-0 right-0 p-8 opacity-20 scale-150 rotate-12 group-hover:scale-125 transition-transform duration-500 ${r.glowBg}`}>{r.icon('w-16 h-16')}</div>
                                  
                                  <div className="flex flex-col gap-4 w-full">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner relative z-10 ${r.iconBg} animate-pulse`}>
                                      {r.icon('w-6 h-6')}
                                    </div>
                                    <h3 className={`font-serif text-2xl sm:text-3xl font-semibold relative z-10 transition-colors duration-300 ${r.titleColor}`}>
                                      {r.title}
                                    </h3>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-xs font-sans text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-widest mt-4 relative z-10">
                                    <span>Read Note</span>
                                    <Heart size={12} className="text-pink-400 fill-pink-400 animate-pulse" />
                                  </div>
                                </div>

                                {/* BACK SIDE */}
                                <div className={`absolute inset-0 backface-hidden rotate-y-180 p-7 sm:p-9 rounded-[32px] flex flex-col justify-center items-center text-center ${r.themeClass} border ${backStyle.border} shadow-2xl overflow-hidden`}
                                  style={{ background: 'linear-gradient(135deg, rgba(13, 5, 25, 0.94) 0%, rgba(5, 2, 10, 0.98) 100%)' }}
                                >
                                  {/* Decorative background icon */}
                                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                    {r.icon('w-48 h-48')}
                                  </div>

                                  <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                    <div className="text-pink-400 animate-bounce">
                                      {r.icon('w-6 h-6')}
                                    </div>
                                    <p className={`font-serif text-xl sm:text-2xl ${backStyle.text} leading-relaxed font-semibold px-2`}>
                                      "{r.desc}"
                                    </p>
                                    <div className="mt-4 text-[10px] font-sans text-white/40 uppercase tracking-widest">
                                      Click to flip back
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 5: SPECIAL VIDEO */}
              {currentSection === 5 && (
                <motion.div key="video"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
                        <span className="text-gradient-cyan">A Special Message</span><br />
                        <span className="text-gradient-rose italic font-medium glow-text-pink">Just for You</span>
                      </h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                      className="glass-panel p-2 sm:p-4 rounded-[36px] overflow-hidden shadow-2xl w-full max-w-3xl"
                    >
                      <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-black/30">
                        <video className="w-full h-full object-cover" controls loop autoPlay muted playsInline preload="auto">
                          <source src={`${import.meta.env.BASE_URL}video/video1.mp4`} type="video/mp4" />
                        </video>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 6: WE TOGETHER */}
              {currentSection === 6 && (
                <motion.div key="together"
                  custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-14">
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-gradient-rose glow-text-pink">We Together</span>
                      </h2>
                      <span className="font-serif text-2xl sm:text-3xl text-gradient-cyan italic font-medium">Every moment is a beautiful memory ✨</span>
                    </motion.div>
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
                      {weTogetherItems.map((item, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-30px' }} transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                          onClick={() => { setActiveMediaList(weTogetherItems); setActiveMediaIndex(i); }}
                          className="glass-panel p-2.5 rounded-[28px] overflow-hidden group hover:bg-white/[0.08] transition-all duration-300 break-inside-avoid relative inline-block w-full mb-5 cursor-pointer"
                          whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(236,72,153,0.25)' }}
                        >
                          <div className={`relative w-full ${item.height} rounded-[20px] overflow-hidden shadow-inner`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70" />
                            <div className="absolute bottom-3 left-0 w-full text-center z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                              <span className="glass-panel px-5 py-2 rounded-full font-sans text-white text-xs tracking-widest uppercase border border-white/30">{item.title}</span>
                            </div>
                            {item.type === 'video' ? (
                              <div className="w-full h-full relative">
                                <video src={item.src} muted loop autoPlay playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" />
                                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white/80">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                </div>
                              </div>
                            ) : (
                              <img src={item.src} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      className="mt-16 text-center flex flex-col items-center gap-6"
                    >
                      <motion.button
                        onClick={() => { triggerConfetti(); setCakeKey(k => k + 1); setCakeComplete(false); setPhase('welcome'); }}
                        className="bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-500 px-8 py-4 rounded-full text-white font-sans font-bold uppercase tracking-widest text-xs flex items-center gap-3 cursor-pointer"
                        style={{ boxShadow: '0 0 25px rgba(236,72,153,0.4)' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(236,72,153,0.7)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Sparkles className="w-4 h-4" />
                        Celebrate Again ✨
                        <Sparkles className="w-4 h-4" />
                      </motion.button>
                      <div className="glass-panel-rose px-10 py-6 rounded-[32px] inline-flex flex-col items-center">
                        <p className="text-pink-200/70 font-sans text-xs uppercase tracking-[0.4em] mb-2 font-semibold">I'm Here For You, Always</p>
                        <p className="font-love text-4xl sm:text-5xl text-gradient-pink-gold glow-text-pink">KANMANI</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {activeMediaIndex >= 0 && (
          <Lightbox
            item={activeMediaList[activeMediaIndex]}
            onClose={() => setActiveMediaIndex(-1)}
            onNext={() => setActiveMediaIndex(p => (p + 1) % activeMediaList.length)}
            onPrev={() => setActiveMediaIndex(p => (p - 1 + activeMediaList.length) % activeMediaList.length)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
