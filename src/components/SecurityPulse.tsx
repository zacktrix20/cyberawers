import { motion } from 'motion/react';
import { Shield, Radio, Activity, Lock, Cpu } from 'lucide-react';

export default function SecurityPulse() {
  const stats = [
    { label: 'Encryption', icon: Lock, status: 'Active', value: 98, color: 'text-accent-blue' },
    { label: 'Firewall', icon: Shield, status: 'Standby', value: 100, color: 'text-accent-green' },
    { label: 'Latency', icon: Radio, status: 'Optimized', value: 24, color: 'text-accent-purple' },
    { label: 'Processor', icon: Cpu, status: 'Nominal', value: 12, color: 'text-text-secondary' },
  ];

  return (
    <div className="bento-card bento-accent-blue !bg-card p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-text-primary uppercase italic tracking-tight">Security Pulse</h3>
          <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em]">Node Integrity Check</p>
        </div>
        <div className="relative">
          <Activity className="text-accent-blue w-6 h-6 animate-pulse" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-accent-blue/30 rounded-full blur-md"
          />
        </div>
      </div>

      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group cursor-default">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-bold text-text-primary uppercase">{stat.label}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>{stat.status}</span>
            </div>
            <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden border border-border/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.value}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full ${stat.color === 'text-text-secondary' ? 'bg-text-secondary' : stat.color.replace('text-', 'bg-')}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
         <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="w-8 h-8 rounded-full bg-card border-2 border-bg overflow-hidden">
               <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="user" className="w-full h-full grayscale" referrerPolicy="no-referrer" />
             </div>
           ))}
           <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-[10px] font-black border-2 border-bg">
             +12
           </div>
         </div>
         <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Peers Online</span>
      </div>
    </div>
  );
}
