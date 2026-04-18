/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Home, BookOpen, MessageSquare, BarChart2, ShieldCheck, Menu, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pages
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ScenariosPage from './pages/ScenariosPage';
import AIChatPage from './pages/AIChatPage';
import AnalysisPage from './pages/AnalysisPage';
import DailyTip from './components/DailyTip';
import { UserProgressProvider, useUserProgress } from './contexts/UserProgressContext';

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { progress } = useUserProgress();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: ShieldCheck, label: 'Quizzes', path: '/quiz' },
    { icon: BookOpen, label: 'Scenarios', path: '/scenarios' },
    { icon: MessageSquare, label: 'AI Shield Chat', path: '/chat' },
    { icon: BarChart2, label: 'Performance', path: '/analysis' },
  ];

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const nextRankPoints = progress.rank === 'Guardian' ? 0 : 
                       progress.rank === 'Sentinel' ? 2000 - progress.points :
                       progress.rank === 'Defender' ? 1000 - progress.points : 500 - progress.points;

  return (
    <div className="flex h-screen bg-bg font-sans text-text-primary overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-bg text-text-primary transform transition-transform duration-300 lg:relative lg:translate-x-0 outline-none border-r border-border",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center">
            <Shield className="text-bg w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl leading-tight tracking-tight text-text-primary">CyberAware</h1>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-black">School Edition</p>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group border border-transparent",
                location.pathname === item.path
                  ? "bg-card text-accent-blue border-border"
                  : "text-text-secondary hover:text-text-primary hover:bg-card/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", location.pathname === item.path ? "text-accent-blue" : "text-text-secondary")} />
              <span className="font-semibold text-sm">{item.label}</span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                />
              )}
            </Link>
          ))}
          <a
            href="https://safeguard.academy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-card/50 transition-all border border-transparent"
          >
            <Shield className="w-5 h-5 opacity-50" />
            <span className="font-semibold text-sm italic">Project Node</span>
          </a>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="bento-card p-5 !rounded-2xl !bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-accent-blue font-black uppercase tracking-widest">User Rank</p>
              <span className="text-[10px] font-black text-text-secondary">{progress.points} SP</span>
            </div>
            <p className="text-base font-bold text-text-primary">{progress.rank}</p>
            {progress.rank !== 'Guardian' && (
              <p className="text-[11px] text-text-secondary mt-1 tracking-tight">{nextRankPoints} XP to level up</p>
            )}
            <div className="mt-3 h-1.5 w-full bg-bg rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.min(100, (progress.points / (progress.points + nextRankPoints)) * 100)}%` }}
                 className="h-full bg-accent-blue" 
               />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-bg/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 lg:hidden text-text-secondary hover:bg-card rounded-xl"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
              <Shield className="text-bg w-4 h-4" />
            </div>
            <h1 className="font-extrabold text-lg leading-tight tracking-tight text-text-primary">CyberAware</h1>
          </div>
          
          <div className="hidden lg:block">
            <h2 className="text-text-secondary font-semibold text-xs uppercase tracking-widest flex items-center gap-2">
              Cybersecurity Awareness <ChevronRight className="w-4 h-4 text-border" /> 
              <span className="text-accent-blue">{navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="flex items-center gap-2 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple px-3 sm:px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-purple/20 transition-colors">
              <AlertTriangle className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Report</span>
            </button>
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-xs font-bold text-text-primary tracking-tight">AGENT: SG-024</p>
              <p className="text-[10px] font-black text-accent-green uppercase tracking-wide">🛡️ SHIELD ACTIVE</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/seed/student/80/80" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth bg-bg">
          <div className="max-w-[1200px] mx-auto h-full">
            {children}
          </div>
        </main>
        <DailyTip />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <UserProgressProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/chat" element={<AIChatPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
          </Routes>
        </Layout>
      </UserProgressProvider>
    </Router>
  );
}
