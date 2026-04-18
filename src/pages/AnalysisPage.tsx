import { Shield, Target, Award, Star, Activity, AlertTriangle, Lock, Zap, Trophy, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useUserProgress } from '../contexts/UserProgressContext';
import { BADGES } from '../constants';

export default function AnalysisPage() {
  const { progress } = useUserProgress();
  
  const stats = [
    { label: 'Security Score', value: `${780 + Math.floor(progress.points/10)}`, icon: Target, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { label: 'Missions Done', value: `${progress.completedScenarios.length}`, icon: Shield, color: 'text-accent-green', bg: 'bg-accent-green/10' },
    { label: 'Shield Points', value: progress.points.toLocaleString(), icon: Award, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
    { label: 'Current Rank', value: progress.rank, icon: Star, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  ];

  const categories = [
    { name: 'Phishing Defense', score: progress.completedScenarios.includes('s1') ? 95 : 45, status: progress.completedScenarios.includes('s1') ? 'Ready' : 'Vulnerable' },
    { name: 'Social Control', score: progress.completedScenarios.includes('s2') ? 88 : 30, status: progress.completedScenarios.includes('s2') ? 'Strong' : 'At Risk' },
    { name: 'Audit Compliance', score: progress.completedQuizzes.length > 0 ? 90 : 20, status: progress.completedQuizzes.length > 0 ? 'Verified' : 'Pending' },
  ];

  const leaderboard = [
    { name: 'Sarah J.', points: 4200, rank: 'Master Guardian' },
    { name: 'You', points: progress.points, rank: progress.rank, isUser: true },
    { name: 'Leo K.', points: 2150, rank: 'Guardian' },
    { name: 'Emma W.', points: 1800, rank: 'Sentinel' },
    { name: 'Alex M.', points: 950, rank: 'Defender' },
  ].sort((a,b) => b.points - a.points);

  const iconMap: { [key: string]: any } = { Shield, Award, Lock, Star, Zap, Trophy };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary tracking-tighter uppercase italic">Strategic Analysis</h2>
          <p className="text-text-secondary text-sm font-medium">Real-time telemetry and achievement protocol.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
           <button className="bg-card text-text-primary border border-border px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-bg transition-colors w-full sm:w-auto">
            Protocol History
          </button>
          <button className="bg-accent-blue text-bg px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.3)] w-full sm:w-auto">
            Download Telemetry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`bento-card ${idx % 3 === 0 ? 'bento-accent-blue' : idx % 3 === 1 ? 'bento-accent-green' : 'bento-accent-purple'}`}
          >
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-6`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-3xl font-black mt-2 text-text-primary tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Skill Matrix */}
          <div className="bento-card bento-accent-blue !bg-card p-6 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
              <h3 className="text-lg font-black text-text-primary uppercase italic tracking-tight">Vulnerability Matrix</h3>
              <div className="flex items-center gap-2 text-[10px] text-accent-green font-black uppercase tracking-[0.2em]">
                <Activity className="w-4 h-4" /> Operational
              </div>
            </div>
            <div className="space-y-10">
              {categories.map((cat, idx) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{cat.name}</span>
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border ${
                      cat.score >= 80 ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 
                      cat.score >= 50 ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20' : 
                      'bg-accent-purple/10 text-accent-purple border-accent-purple/20'
                    }`}>
                      {cat.status}
                    </span>
                  </div>
                  <div className="h-4 w-full bg-bg rounded-lg overflow-hidden border border-border p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + (idx * 0.2) }}
                      className={`h-full rounded-md ${
                        cat.score >= 80 ? 'bg-accent-green shadow-[0_0_10px_rgba(74,222,128,0.4)]' : 
                        cat.score >= 50 ? 'bg-accent-blue shadow-[0_0_10px_rgba(56,189,248,0.4)]' : 
                        'bg-accent-purple shadow-[0_0_10px_rgba(192,132,252,0.4)]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge Gallery */}
          <div className="bento-card bento-accent-purple !bg-card p-6 md:p-10">
            <h3 className="text-lg font-black text-text-primary uppercase italic tracking-tight mb-8">Achievement Vault</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {BADGES.map((badge) => {
                const isUnlocked = progress.badges.includes(badge.id);
                const Icon = iconMap[badge.iconName] || Award;
                
                return (
                  <div key={badge.id} className="group relative flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                      isUnlocked 
                        ? 'bg-accent-purple/10 border-accent-purple text-accent-purple shadow-[0_0_15px_rgba(192,132,252,0.3)]' 
                        : 'bg-bg border-border text-text-secondary grayscale opacity-30'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <p className={`mt-3 text-[10px] font-black uppercase text-center tracking-tight ${isUnlocked ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {badge.name}
                    </p>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-3 hidden group-hover:block w-40 bg-card border border-border p-3 rounded-xl z-50 shadow-2xl">
                       <p className="text-[10px] font-black uppercase text-accent-purple mb-1">{badge.name}</p>
                       <p className="text-[10px] text-text-secondary leading-tight">{badge.description}</p>
                       {!isUnlocked && <p className="text-[9px] text-accent-blue mt-2 font-bold italic">Req: {badge.requirement}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           {/* Leaderboard Card */}
           <div className="bento-card bento-accent-green !bg-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-accent-green w-5 h-5" />
              <h3 className="text-sm font-black text-text-primary uppercase tracking-[0.2em] italic">Global Rank List</h3>
            </div>
            <div className="space-y-4">
              {leaderboard.map((user, idx) => (
                <div 
                  key={user.name} 
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    user.isUser ? 'bg-accent-green/10 border-accent-green/30' : 'bg-bg border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-text-secondary w-4">{idx + 1}.</span>
                    <div>
                      <p className={`text-xs font-bold ${user.isUser ? 'text-text-primary' : 'text-text-secondary'}`}>{user.name}</p>
                      <p className="text-[9px] text-text-secondary/50 font-black uppercase tracking-widest">{user.rank}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-black ${user.isUser ? 'text-accent-green' : 'text-text-primary'}`}>{user.points}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-accent-green/5 rounded-xl border border-dashed border-accent-green/20">
               <p className="text-[10px] text-accent-green font-medium leading-relaxed italic">
                 "Leaderboards are currently simulated via local sync. Reach Sentinel rank to participate in global rankings."
               </p>
            </div>
          </div>

          <div className="bento-card bento-accent-blue !bg-accent-blue/5 p-8">
             <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-accent-blue w-6 h-6" />
                <h4 className="text-sm font-black text-text-primary uppercase tracking-[0.2em]">Next Node Warning</h4>
             </div>
             <p className="text-text-secondary text-xs leading-relaxed font-medium mb-6">
                Your <span className="text-accent-blue">Phishing Defense</span> vector needs 1 more clean simulation to unlock the <span className="text-text-primary tracking-widest uppercase">Sentinel</span> rank.
             </p>
             <button className="w-full bg-accent-blue text-bg py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                Enter Tactical Sim
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
