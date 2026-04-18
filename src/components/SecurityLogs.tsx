import { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_TEMPLATES = [
  { type: 'info', msg: 'Knowledge packet decrypted: $TOPIC' },
  { type: 'success', msg: 'Firewall node $NODE synchronized' },
  { type: 'warning', msg: 'Attempted unauthorized access on $VECTOR' },
  { type: 'success', msg: 'Shield points successfully forged: $POINTS SP' },
  { type: 'info', msg: 'Agent status: $RANK verified' },
  { type: 'alert', msg: 'Critical vulnerability $VULN neutralized' },
];

const DATA_POINTS = {
  TOPIC: ['Phishing', '2FA', 'Encryption', 'Malware', 'Privacy'],
  NODE: ['Alpha-1', 'Sigma-9', 'Omega-0', 'Delta-4'],
  VECTOR: ['Port 443', 'SMTP Relay', 'SSH Service', 'Proxy Layer'],
  POINTS: ['100', '250', '500'],
  RANK: ['Sentinel', 'Guardian', 'Defender'],
  VULN: ['CVE-2024-X', 'Log4j-v3', 'Ghost-Packet'],
};

interface LogEntry {
  id: string;
  type: string;
  text: string;
  time: string;
}

export default function SecurityLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const addLog = () => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      let text = template.msg;
      
      Object.entries(DATA_POINTS).forEach(([key, values]) => {
        text = text.replace(`$${key}`, values[Math.floor(Math.random() * values.length)]);
      });

      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        type: template.type,
        text,
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      setLogs(prev => [newLog, ...prev].slice(0, 10));
    };

    const interval = setInterval(addLog, 4000);
    addLog(); // Initial log
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-card !bg-bg/40 border-border p-5 h-full flex flex-col font-mono">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-text-secondary" />
          <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Active Audit Console</span>
        </div>
        <div className="flex gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
           <div className="w-1.5 h-1.5 rounded-full bg-text-secondary/20" />
           <div className="w-1.5 h-1.5 rounded-full bg-text-secondary/20" />
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden relative">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3"
            >
              <span className="text-[9px] text-text-secondary shrink-0">[{log.time}]</span>
              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                {log.type === 'success' && <Zap className="w-2.5 h-2.5 text-accent-green" />}
                {log.type === 'info' && <Shield className="w-2.5 h-2.5 text-accent-blue" />}
                {log.type === 'warning' && <AlertCircle className="w-2.5 h-2.5 text-accent-purple" />}
                {log.type === 'alert' && <div className="w-2 h-2 rounded-full bg-accent-purple animate-ping" />}
              </div>
              <p className={`text-[10px] leading-relaxed break-words ${
                log.type === 'success' ? 'text-accent-green' : 
                log.type === 'warning' ? 'text-accent-purple font-bold' : 
                log.type === 'alert' ? 'text-accent-purple font-black underline underline-offset-2' : 
                'text-text-primary'
              }`}>
                {log.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
         <p className="text-[8px] text-text-secondary text-right w-full uppercase tracking-tighter italic">
           Secure SG-OS v4.0.2 // Node: SG-ACADEMY-MAIN
         </p>
      </div>
    </div>
  );
}
