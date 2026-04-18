import { Shield, ShieldAlert, Key, UserCheck, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ThreatTicker from '../components/ThreatTicker';
import SecurityPulse from '../components/SecurityPulse';
import CredentialForge from '../components/CredentialForge';
import SecurityLogs from '../components/SecurityLogs';
import { useUserProgress } from '../contexts/UserProgressContext';

export default function HomePage() {
  const { progress } = useUserProgress();
  const cards = [
    {
      title: 'Active Quizzes',
      icon: ShieldCheck,
      description: 'Test your knowledge on privacy and safety.',
      color: 'accent-green',
      path: '/quiz',
      delay: 0.1,
      span: 'grid-span-1-2'
    },
    {
      title: 'Security Scenarios',
      icon: ShieldAlert,
      description: 'Practice real-life cyber threat responses.',
      color: 'accent-blue',
      path: '/scenarios',
      delay: 0.2,
      span: 'grid-span-2-2'
    },
    {
      title: 'AI Shield Chat',
      icon: Key,
      description: 'Ask our AI expert any security questions.',
      color: 'accent-purple',
      path: '/chat',
      delay: 0.3,
      span: 'grid-span-1-2'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <ThreatTicker />
      <section className="relative overflow-hidden bento-card bento-accent-blue bg-card p-6 md:!p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-center">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.1] mb-4 md:mb-6 tracking-tighter text-text-primary uppercase italic"
          >
            Cybersecurity <span className="text-accent-blue">Awareness</span> App for School
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-sm md:text-lg mb-8 md:mb-10 leading-relaxed font-medium"
          >
            Master the art of online self-defense. Navigate simulation scenarios, complete live audits, and secure your digital perimeter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/quiz" 
              className="inline-flex items-center gap-3 bg-accent-blue text-bg px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_8px_20px_rgba(56,189,248,0.3)]"
            >
              Initialize Training <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
        
        {/* Background Decor */}
        <Shield className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-accent-blue/5 -rotate-12 pointer-events-none" />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[180px]">
        {/* Daily Scenario Bento Card */}
        <div className="bento-card bento-accent-blue md:col-span-2 md:row-span-2 p-6 md:p-8">
          <span className="text-[10px] uppercase font-black tracking-[0.2em] text-accent-blue mb-4 block">Daily Scenario</span>
          <h3 className="text-2xl font-bold mb-3 text-text-primary italic tracking-tight">Phishing or Legit?</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-8">
            You received an email from "School-IT-Admin@gmail.com" asking to verify your password immediately or your account will be deleted. What is the first red flag?
          </p>
          <div className="mt-auto space-y-3">
             <div className="bg-bg p-4 border border-accent-blue/30 rounded-xl text-xs font-semibold text-accent-blue">Check the sender's domain name</div>
             <div className="bg-bg/50 p-4 border border-border rounded-xl text-xs font-semibold text-text-secondary">Click the link to see where it goes</div>
          </div>
        </div>

        <div className="bento-card bento-accent-green md:col-span-1 md:row-span-2 text-center flex flex-col items-center justify-center p-6 md:p-8">
           <span className="text-[10px] uppercase font-black tracking-[0.2em] text-accent-green mb-4 block">Current Score</span>
           <div className="text-6xl font-black text-accent-green leading-none mb-2">{progress.points}</div>
           <p className="text-[11px] text-text-secondary uppercase font-bold tracking-widest mb-8">Role: {progress.rank}</p>
           
           <div className="w-full space-y-4 text-left">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-xs text-text-secondary">Quizzes Done</span>
                <span className="text-sm font-bold text-accent-blue">{progress.completedQuizzes.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-xs text-text-secondary">Missions</span>
                <span className="text-sm font-bold text-accent-blue">{progress.completedScenarios.length}</span>
              </div>
           </div>
        </div>

        {/* Security Pulse Widget */}
        <div className="md:col-span-1 md:row-span-2">
           <SecurityPulse />
        </div>

        {/* AI advisor bento */}
        <div className="bento-card bento-accent-purple md:col-span-1 md:row-span-1 !bg-accent-blue/5 p-6 md:p-8">
           <span className="text-[10px] uppercase font-black tracking-[0.2em] text-accent-purple mb-3 block">Safety Advisor</span>
           <p className="text-xs text-text-primary italic font-medium">"Is sharing my Wi-Fi password safe?"</p>
           <div className="mt-3 bg-bg/80 p-3 rounded-xl border border-border text-[11px] text-text-secondary">
             It depends on who it is. Never share with unknown networks.
           </div>
        </div>

        {/* Privacy Shield bento */}
        <div className="bento-card md:col-span-1 md:row-span-1 p-6 md:p-8">
           <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary mb-3 block">Privacy Shield</span>
           <h4 className="text-2xl font-bold text-text-primary">2FA Active</h4>
           <div className="text-[10px] font-bold text-accent-green mt-2 flex items-center gap-1">
             <ShieldCheck className="w-3 h-3" /> HIGH PROTECTION
           </div>
        </div>

        {/* Credential Forge bento */}
        <div className="md:col-span-2 md:row-span-2">
           <CredentialForge />
        </div>

        {/* Global Analysis bento */}
        <div className="bento-card bento-accent-blue md:col-span-2 md:row-span-1 flex-row items-end gap-6 md:gap-10 p-6 md:p-8 min-h-[180px]">
           <div className="flex-1 self-start">
             <span className="text-[10px] uppercase font-black tracking-[0.2em] text-accent-blue mb-3 block">Weekly Trends</span>
             <h4 className="text-xl font-bold text-text-primary">Inbound Threats</h4>
           </div>
           <div className="flex-1 h-full flex items-end gap-3 pb-2">
              <div className="flex-1 bg-accent-blue h-[60%] rounded-sm"></div>
              <div className="flex-1 bg-accent-blue/40 h-[40%] rounded-sm"></div>
              <div className="flex-1 bg-accent-blue h-[85%] rounded-sm shadow-[0_0_10px_rgba(56,189,248,0.4)]"></div>
              <div className="flex-1 bg-accent-blue/20 h-[30%] rounded-sm"></div>
              <div className="flex-1 bg-accent-blue/60 h-[50%] rounded-sm"></div>
           </div>
        </div>

        {/* Security Logs bento */}
        <div className="md:col-span-1 md:row-span-1">
           <SecurityLogs />
        </div>

        {/* Resources bento */}
        <div className="bento-card md:col-span-1 md:row-span-1 p-6 md:p-8">
           <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary mb-3 block">Library</span>
           <div className="flex flex-wrap gap-2 mt-auto">
             {['Passwords', 'Malware', 'Phishing'].map(t => (
               <span key={t} className="px-2 py-1 bg-bg/50 border border-border rounded-lg text-[10px] font-bold text-text-secondary">{t}</span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
