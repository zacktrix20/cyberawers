import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

const TIPS = [
  "Never use the same password across multiple platforms.",
  "Public Wi-Fi is an open door for eavesdroppers. Use a VPN.",
  "Enable 2FA on every account that supports it.",
  "Your school email is for academic use; keep personal accounts separate.",
  "If an offer seems too good to be true, it's probably a phishing attempt.",
  "Check the 'Reply-To' address in suspicious emails; it often reveals the scam.",
  "Cyberbullying thrives in silence. Report and block the harasser.",
  "Regular backups protect you from Ransomware attacks."
];

export default function DailyTip() {
  const [tip, setTip] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setTip(randomTip);
    
    // Show after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 z-50 sm:w-72"
        >
          <div className="bento-card bento-accent-purple !bg-card p-5 shadow-2xl border-accent-purple/30">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-accent-purple/10 rounded-lg">
                <Sparkles className="w-4 h-4 text-accent-purple" />
              </div>
              <span className="text-[10px] font-black text-accent-purple uppercase tracking-widest">Defense Tip</span>
            </div>
            
            <p className="text-xs text-text-primary leading-relaxed font-medium pr-4 italic">
              "{tip}"
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
