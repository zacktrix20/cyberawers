import { motion } from 'motion/react';
import { AlertTriangle, Wifi, Terminal, Globe } from 'lucide-react';

const THREATS = [
  { id: 1, type: 'Blocked', target: 'SMTP Node', location: 'Frankfurt, DE', time: '2s ago', icon: Terminal },
  { id: 2, type: 'Intercepted', target: 'Public Wi-Fi', location: 'Retail Sector', time: '12s ago', icon: Wifi },
  { id: 3, type: 'Shielded', target: 'DNS Probe', location: 'Global Mesh', time: '1m ago', icon: Globe },
  { id: 4, type: 'Neutralized', target: 'Brute Force', location: 'Internal VNet', time: '3m ago', icon: AlertTriangle },
];

export default function ThreatTicker() {
  return (
    <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden flex h-12 md:h-14 backdrop-blur-md">
      <div className="bg-accent-blue/10 border-r border-border/50 px-4 md:px-6 flex items-center gap-2 md:gap-3 shrink-0">
        <Activity className="w-3 md:w-4 h-3 md:h-4 text-accent-blue animate-pulse" />
        <span className="text-[9px] md:text-[10px] font-black uppercase text-accent-blue tracking-[0.2em] italic">Live Intelligence</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap h-full items-center"
        >
          {[...THREATS, ...THREATS, ...THREATS].map((threat, idx) => (
            <div key={`${threat.id}-${idx}`} className="flex items-center gap-4 px-8 border-r border-border/20">
              <threat.icon className="w-3.5 h-3.5 text-text-secondary opacity-50" />
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">{threat.type}:</span>
              <span className="text-[10px] text-text-secondary font-medium lowercase tracking-wide">{threat.target}</span>
              <span className="text-[9px] font-black text-accent-green uppercase opacity-50 px-2 py-0.5 rounded bg-accent-green/5 border border-accent-green/10">{threat.location}</span>
              <span className="text-[9px] text-text-secondary font-mono italic opacity-30">{threat.time}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
