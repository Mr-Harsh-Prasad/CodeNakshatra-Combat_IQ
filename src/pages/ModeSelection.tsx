import React, { useState } from 'react';
import { Camera, Swords, BarChart2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModeSelectionProps {
  onBack: () => void;
  onSelectMode: (mode: 'live' | 'fight' | 'analytics') => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onBack, onSelectMode }) => {
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  const modes = [
    {
      id: 'live',
      title: 'Neural Tracker',
      desc: 'Real-time joint mapping & coaching',
      icon: Camera,
      color: '#0ff',
      delay: 0.1
    },
    {
      id: 'fight',
      title: 'Sparring Analyzer',
      desc: 'Post-match biomechanical breakdown',
      icon: Swords,
      color: '#f0f',
      delay: 0.2
    },
    {
      id: 'analytics',
      title: 'Data Vault',
      desc: 'Longitudinal progression metrics',
      icon: BarChart2,
      color: '#0070f3',
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-[#050505] flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#050505] -z-20"></div>
      <div className="absolute inset-0 opacity-30 mix-blend-overlay -z-10" style={{ 
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px' 
      }}></div>
      
      {/* Dynamic Glow based on hover */}
      <motion.div 
        animate={{ 
          background: hoveredMode === 'live' ? 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 60%)' :
                      hoveredMode === 'fight' ? 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, transparent 60%)' :
                      hoveredMode === 'analytics' ? 'radial-gradient(circle, rgba(0,112,243,0.15) 0%, transparent 60%)' :
                      'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)'
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 -z-10"
      />

      {/* Nav */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-3 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold text-[10px]"
      >
        <ArrowLeft size={14} /> // Abort Selection
      </motion.button>

      <div className="text-center mt-12 mb-16 relative z-10 w-full max-w-5xl px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-black text-4xl uppercase tracking-widest text-[#0ff]"
        >
          Initialize Module
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-24 h-px bg-[#0ff] mx-auto mt-4"
        />
      </div>

      {/* 3D Fan Layout Container */}
      <div className="relative w-full max-w-6xl mx-auto h-[60vh] flex items-center justify-center perspective-[1200px]">
        {modes.map((mode, i) => {
          const isHovered = hoveredMode === mode.id;
          const isAnotherHovered = hoveredMode !== null && hoveredMode !== mode.id;
          
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, rotateY: 45, x: 200, z: -500 }}
              animate={{ 
                opacity: isAnotherHovered ? 0.3 : 1,
                rotateY: isHovered ? 0 : (i === 0 ? 15 : i === 1 ? 0 : -15),
                x: isHovered ? 0 : (i === 0 ? -250 : i === 1 ? 0 : 250),
                z: isHovered ? 50 : (i === 1 && !hoveredMode ? 0 : -100),
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                damping: 15,
                opacity: { duration: 0.4 },
                delay: hoveredMode ? 0 : mode.delay // Only delay on initial mount
              }}
              onHoverStart={() => setHoveredMode(mode.id)}
              onHoverEnd={() => setHoveredMode(null)}
              onClick={() => onSelectMode(mode.id as 'live' | 'fight' | 'analytics')}
              className="absolute cursor-pointer cyber-panel w-[320px] h-[480px] flex flex-col transform-gpu overflow-hidden group"
              style={{
                boxShadow: isHovered ? `0 0 50px ${mode.color}40, inset 0 0 20px ${mode.color}10` : '0 0 30px rgba(0,0,0,0.8)'
              }}
            >
              {/* Highlight bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                style={{ 
                  background: mode.color,
                  opacity: isHovered ? 1 : 0.3
                }}
              />

              <div className="flex-1 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-auto">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">MOD_0{i+1}</span>
                  <mode.icon size={24} color={mode.color} className={isHovered ? 'animate-pulse' : ''} />
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-2" style={{ color: isHovered ? '#fff' : '#cbd5e1' }}>
                    {mode.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400">
                    {mode.desc}
                  </p>
                </div>
              </div>

              {/* Hover action overlay */}
              <motion.div 
                initial={false}
                animate={{ y: isHovered ? 0 : '100%' }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-sm border-t border-white/10"
              >
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest" style={{ color: mode.color }}>
                  <span>Execute</span>
                  <span>→</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
