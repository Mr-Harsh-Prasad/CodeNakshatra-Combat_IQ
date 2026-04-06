import React, { useState, useEffect } from 'react';
import { Camera, Swords, Brain, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Simulate UI boot sequence
    const timer = setTimeout(() => setBooting(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-[#050505]">
      {/* Structural Elements */}
      <div className="scanline"></div>
      <div className="scanline-bar"></div>

      {/* Volumetric glow leaks */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="glow-leak" 
        style={{ top: '20%', left: '10%', width: '40vw', height: '40vw', background: 'var(--neon-cyan)' }}
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="glow-leak" 
        style={{ bottom: '-10%', right: '5%', width: '45vw', height: '45vw', background: 'var(--neon-purple)' }}
      />

      {/* Dark Ambient Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0 pointer-events-none"></div>

      {booting ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="text-center flex flex-col items-center">
            <motion.div 
              animate={{ opacity: [0, 1, 0.2, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1], repeat: Infinity }}
              className="w-16 h-1 bg-[#0ff] mb-4"
            />
            <h1 className="glitch-text font-display font-black text-4xl text-[#0ff] tracking-widest lowercase" data-text="sys.init(vc_engine)">
              sys.init(vc_engine)
            </h1>
            <p className="text-xs font-mono text-gray-500 mt-2 uppercase">Mounting neural tracker</p>
          </div>
        </div>
      ) : (
        <>
          {/* Decoupled Asymmetric Nav */}
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, ease: "easeOut" }}
            className="absolute top-6 right-6 z-50 cyber-panel px-8 py-4 flex items-center gap-8"
          >
            <span className="font-display font-black text-xl tracking-tight text-white skew-x-[-10deg]">
              COMBAT<span className="text-[#0ff]">IQ</span>
            </span>
            <div className="w-px h-6 bg-white/20 skew-x-[-10deg]" />
            <motion.button 
              whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onLaunch} 
              className="font-bold text-[11px] uppercase tracking-[0.2em] text-[#0ff]"
            >
              [ Launch System ]
            </motion.button>
          </motion.nav>

          <main className="relative z-10 w-full min-h-screen flex flex-col justify-center px-10 lg:px-20">
            {/* Split viewport slant */}
            <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" style={{ clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)' }} />

            <div className="relative z-20 max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#0ff]/10 border border-[#0ff]/30 text-[#0ff] text-[10px] font-black uppercase tracking-widest mb-6"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                <span className="w-1.5 h-1.5 bg-[#0ff] animate-pulse"></span>
                v2.0 Neural Engine
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
                className="font-display font-black text-7xl md:text-[8rem] leading-[0.9] tracking-tighter mb-8"
              >
                HACK <br/>
                <span className="text-gradient-cyber mr-2">YOUR</span>
                FORM
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-slate-400 max-w-xl mb-12 font-medium leading-relaxed"
              >
                Sub-millisecond AI pose detection. <br/> Zero sensors. Pure computer vision.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLaunch} 
                  className="group relative px-8 py-5 text-sm font-black uppercase tracking-widest text-[#050505] bg-[#0ff] overflow-hidden"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
                >
                  <div className="absolute inset-0 bg-white/30 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    <Play size={16} className="fill-current" /> Begin Training
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Floating Geometry Features */}
            <div className="absolute top-[20%] right-[10%] w-[400px] hidden lg:block perspective-[1000px]">
              <motion.div 
                initial={{ rotateY: 30, rotateX: 10, opacity: 0, x: 100 }}
                animate={{ rotateY: -10, rotateX: 5, opacity: 1, x: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 40 }}
                className="cyber-panel p-6 flex flex-col gap-6 transform-gpu"
              >
                {[
                  { icon: Camera, title: "Latency-Free Tracking", color: "#0ff" },
                  { icon: Swords, title: "Sparring Analyzer", color: "#f0f" },
                  { icon: Brain, title: "AI Grandmaster Advice", color: "#0070f3" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: -10, scale: 1.02 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-black/50 border" style={{ borderColor: `${item.color}40`, color: item.color }}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-sm uppercase tracking-wider text-white group-hover:text-white transition-colors">{item.title}</h3>
                      <div className="w-0 h-0.5 mt-1 transition-all group-hover:w-full" style={{ background: item.color }}></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
