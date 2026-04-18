import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Shield, ShieldCheck, ShieldAlert, RefreshCw, Copy, Check } from 'lucide-react';

export default function CredentialForge() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const strength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 5);
  }, [password]);

  const strengthInfo = useMemo(() => {
    const infos = [
      { label: 'VULNERABLE', color: 'text-accent-purple', bg: 'bg-accent-purple/20', desc: 'Can be cracked in seconds.' },
      { label: 'WEAK', color: 'text-accent-purple', bg: 'bg-accent-purple/20', desc: 'Predictable pattern detected.' },
      { label: 'MODERATE', color: 'text-accent-blue', bg: 'bg-accent-blue/20', desc: 'Decent, but needs special chars.' },
      { label: 'STRONG', color: 'text-accent-green', bg: 'bg-accent-green/20', desc: 'Good resistance to brute force.' },
      { label: 'SECURE', color: 'text-accent-green', bg: 'bg-accent-green/20', desc: 'Sentinel-grade encryption.' },
      { label: 'UNBREAKABLE', color: 'text-accent-green', bg: 'bg-accent-green/20', desc: 'Ready for deep-net deployment.' },
    ];
    return infos[strength];
  }, [strength]);

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPass = "";
    for (let i = 0; i < 16; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bento-card bento-accent-blue !bg-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center border border-accent-blue/20">
          <Key className="w-5 h-5 text-accent-blue" />
        </div>
        <div>
          <h3 className="text-sm font-black text-text-primary uppercase tracking-widest italic">Credential Forge</h3>
          <p className="text-[9px] text-text-secondary font-black uppercase tracking-[0.2em]">Password Strength Analysis</p>
        </div>
      </div>

      <div className="relative mb-6">
        <input 
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Input passphrase..."
          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
        />
        <div className="absolute right-2 top-1.5 flex gap-1">
          <button 
            onClick={generatePassword}
            className="p-1.5 hover:bg-card rounded-lg text-text-secondary hover:text-accent-blue transition-colors"
            title="Generate Random"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-card rounded-lg text-text-secondary hover:text-accent-blue transition-colors"
            title="Copy"
          >
            {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="flex justify-between items-end mb-1">
           <span className={`text-[10px] font-black uppercase tracking-widest ${strengthInfo.color}`}>
             {strengthInfo.label}
           </span>
           <span className="text-[9px] text-text-secondary font-mono">{(strength/5*100).toFixed(0)}% Integrity</span>
        </div>
        <div className="flex gap-1 h-1.5">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-full transition-all duration-500 ${
                i < strength 
                  ? strength <= 2 ? 'bg-accent-purple' : i <= 3 ? 'bg-accent-blue' : 'bg-accent-green' 
                  : 'bg-bg'
              }`} 
            />
          ))}
        </div>
        
        <div className={`p-4 rounded-xl border border-dashed transition-colors duration-500 ${strengthInfo.bg.replace('bg-', 'bg-opacity-10 ')} border-opacity-30`}>
           <div className="flex items-start gap-3">
              {strength <= 2 ? <ShieldAlert className="w-5 h-5 text-accent-purple shrink-0" /> : <ShieldCheck className="w-5 h-5 text-accent-green shrink-0" />}
              <p className="text-[11px] text-text-secondary leading-relaxed italic font-medium">
                {strengthInfo.desc} 
                {strength < 5 && <span className="block mt-1 text-[9px] text-text-secondary/60">Tip: Combine mixed cases, symbols, and length {">"} 12.</span>}
              </p>
           </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
         <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-text-secondary opacity-50" />
            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Local Audit Logic</span>
         </div>
         <span className="text-[9px] font-black text-accent-blue uppercase tracking-widest decoration-dotted underline cursor-help">Analysis Details</span>
      </div>
    </div>
  );
}
