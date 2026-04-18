import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Send, User, Bot, Loader2, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askAI } from '../services/geminiService';
import { useUserProgress } from '../contexts/UserProgressContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm the **CyberAware Guard**. I can help you understand how to stay safe online in the **Cybersecurity Awareness App for School**. \n\nAsk me anything about: \n- Protecting your privacy\n- Dealing with cyberbullying \n- Spotting phishing emails \n- Creating strong passwords"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { useGemini } = useUserProgress();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    useGemini(); // Track AI usage for badges

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await askAI(input, history);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] flex flex-col bento-card bento-accent-purple !p-0">
      <div className="p-4 md:p-5 bg-card border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-purple rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-bg" />
          </div>
          <div>
            <h2 className="font-black text-text-primary uppercase tracking-tighter italic">AI Safety Guard</h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              <span className="text-[9px] uppercase font-black text-text-secondary tracking-[0.2em]">Live Analysis Active</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-text-secondary font-black uppercase tracking-[0.1em] bg-bg px-3 py-1.5 rounded-lg border border-border">
          <Info className="w-3.5 h-3.5" />
          <span>Core Protocol: Secure</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-bg flex flex-col"
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${message.role === 'user' ? 'bg-accent-blue border-accent-blue/30' : 'bg-card border-border'}`}>
                {message.role === 'user' ? <User className="w-5 h-5 text-bg" /> : <Bot className="w-5 h-5 text-accent-purple" />}
              </div>
              <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-lg border ${
                message.role === 'user' 
                  ? 'bg-accent-blue text-bg border-accent-blue/20 rounded-tr-none font-bold' 
                  : 'bg-card text-text-primary border-border rounded-tl-none font-medium prose prose-invert prose-sm max-w-none'
              }`}>
                {message.role === 'model' ? (
                  <div className="markdown-body text-text-primary">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center">
               <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
                 <Bot className="w-5 h-5 text-accent-purple" />
               </div>
               <div className="bg-card p-5 rounded-2xl border border-border flex items-center gap-3">
                 <Loader2 className="w-4 h-4 animate-spin text-accent-purple" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Synthesizing Security Logic...</span>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-card border-t border-border">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative max-w-4xl mx-auto flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input security query..."
            className="flex-1 bg-bg border border-border rounded-2xl px-6 py-4 pr-16 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple/20 focus:border-accent-purple transition-all placeholder:text-text-secondary/50 placeholder:uppercase placeholder:tracking-widest"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-3 bg-accent-purple text-bg rounded-xl hover:scale-110 transition-transform disabled:opacity-30 disabled:scale-100 group shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[9px] text-center text-text-secondary mt-3 font-black uppercase tracking-[0.2em]">
          End-to-end encrypted session. AI Guard is always here to help.
        </p>
      </div>
    </div>
  );
}
