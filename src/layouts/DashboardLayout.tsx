import React from 'react';
import { Camera, CameraOff, Swords, BarChart2, Mic, MicOff, Film, ArrowLeft, Zap, Orbit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type Tab = 'live' | 'analytics' | 'fight';
export type LiveMode = 'camera' | 'video';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onBackToMenu: () => void;
  // Live mode
  liveMode: LiveMode;
  onSwitchLiveMode: (mode: LiveMode) => void;
  isTracking: boolean;
  onToggleTracking: () => void;
  // Fight mode
  isFighting: boolean;
  onStartFight: () => void;
  onStopFight: () => void;
  // Voice
  isMicOn: boolean;
  onToggleMic: () => void;
  transcript: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  onBackToMenu,
  liveMode,
  onSwitchLiveMode,
  isTracking,
  onToggleTracking,
  isFighting,
  onStartFight,
  onStopFight,
  isMicOn,
  onToggleMic,
  transcript,
}) => {
  const isActionActive = isTracking || isFighting;
  const activeColor = activeTab === 'live' ? '#0ff' : activeTab === 'fight' ? '#f0f' : '#0070f3';

  return (
    <div className="min-h-screen flex flex-col relative text-white overflow-hidden bg-[#050505]">
      {/* Deep Space Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="scanline" />
        <motion.div 
          animate={{ opacity: isActionActive ? 0.3 : 0.1 }}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ 
            background: `radial-gradient(circle at 50% 0%, ${activeColor}40 0%, transparent 60%)` 
          }} 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Floating Top Left Brand & Nav */}
      <div className="absolute top-6 left-6 z-50 flex items-start gap-6 pointer-events-auto">
        <button 
          onClick={onBackToMenu}
          className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-white">
            <Orbit size={18} color={activeColor} className={isActionActive ? "animate-spin-slow" : ""} />
            <h1 className="font-display font-black text-xl italic tracking-tighter">COMBAT<span style={{ color: activeColor }}>IQ</span></h1>
          </div>
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[9px] font-bold uppercase tracking-[0.3em] mt-1"
            style={{ color: activeColor }}
          >
            SYS.MODULE.{activeTab.toUpperCase()}
          </motion.div>
        </div>
      </div>

      {/* Action / Transcript Floating Notify */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {isActionActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="px-4 py-1.5 flex items-center gap-3 bg-black/60 border backdrop-blur-md"
              style={{ borderColor: `${activeColor}50`, clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeColor }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeColor }}>
                {isTracking ? 'Live Sync Active' : 'Match Analysis Online'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {transcript && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-[250px] px-4 py-3 bg-black/80 border border-white/10 backdrop-blur-md text-[11px] font-italic text-slate-300 leading-relaxed shadow-lg pointer-events-auto"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            >
              "{transcript}"
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area - Full height, layout overlay handles UI */}
      <div className="flex-1 w-full h-full relative z-10 pt-24 pb-32">
         {children}
      </div>

      {/* Floating Orbital Command Deck */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="relative group">
          {/* Animated Glow Border */}
          <div className="absolute -inset-[1px] opacity-50 bg-gradient-to-r from-[#0ff] via-[#f0f] to-[#0070f3] blur-sm transition-opacity duration-500 group-hover:opacity-100" style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }} />
          
          <div className="relative flex items-center bg-black/90 backdrop-blur-xl pointer-events-auto shadow-2xl"
               style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center px-2 py-2">
              <button 
                onClick={() => setActiveTab('live')} 
                className={`p-3 transition-colors ${activeTab === 'live' ? 'text-[#0ff]' : 'text-slate-500 hover:text-white'}`}
              >
                <Camera size={18} />
              </button>
              <button 
                onClick={() => setActiveTab('fight')} 
                className={`p-3 transition-colors ${activeTab === 'fight' ? 'text-[#f0f]' : 'text-slate-500 hover:text-white'}`}
              >
                <Swords size={18} />
              </button>
              <button 
                onClick={() => setActiveTab('analytics')} 
                className={`p-3 transition-colors ${activeTab === 'analytics' ? 'text-[#0070f3]' : 'text-slate-500 hover:text-white'}`}
              >
                <BarChart2 size={18} />
              </button>
            </div>

            <div className="w-px h-8 bg-white/10 mx-2" />

            {/* Contextual Actions */}
            <div className="flex items-center px-4 py-2 gap-4">
              
              {/* Voice toggle */}
              <button 
                onClick={onToggleMic} 
                className={`flex items-center justify-center p-2 rounded-full transition-colors ${isMicOn ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}
              >
                {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
              </button>

              {/* Sub-mode for Live */}
              {activeTab === 'live' && (
                <div className="flex items-center bg-white/5 rounded-full p-1">
                  <button onClick={() => onSwitchLiveMode('camera')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${liveMode === 'camera' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>Cam</button>
                  <button onClick={() => onSwitchLiveMode('video')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${liveMode === 'video' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>Vid</button>
                </div>
              )}

              {/* Action Buttons */}
              {activeTab === 'live' && (
                <button
                  onClick={onToggleTracking}
                  className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${
                    isTracking 
                    ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30' 
                    : 'bg-[#0ff]/10 text-[#0ff] hover:bg-[#0ff]/20'
                  }`}
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                >
                  {isTracking ? <><CameraOff size={14} /> Halt</> : <><Zap size={14} /> Engage</>}
                </button>
              )}

              {activeTab === 'fight' && (
                <button
                  onClick={isFighting ? onStopFight : onStartFight}
                  className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${
                    isFighting 
                    ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30' 
                    : 'bg-[#f0f]/10 text-[#f0f] hover:bg-[#f0f]/20'
                  }`}
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                >
                  {isFighting ? <><CameraOff size={14} /> Halt</> : <><Swords size={14} /> Engage</>}
                </button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
