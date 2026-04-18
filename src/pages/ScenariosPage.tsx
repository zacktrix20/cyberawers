import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCENARIOS } from '../constants';
import { BookOpen, AlertTriangle, CheckCircle, ArrowLeft, Terminal, Shield } from 'lucide-react';
import { useUserProgress } from '../contexts/UserProgressContext';

export default function ScenariosPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const { addPoints, completeScenario } = useUserProgress();
  const activeScenario = SCENARIOS.find(s => s.id === selectedScenarioId);
  const currentStep = activeScenario && currentStepId ? activeScenario.steps[currentStepId] : null;

  useEffect(() => {
    if (selectedScenarioId && activeScenario) {
      setCurrentStepId(activeScenario.initialStepId);
      setSelectedChoice(null);
      setIsCompleted(false);
    }
  }, [selectedScenarioId, activeScenario]);

  const handleChoice = (idx: number) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(idx);
    const choice = currentStep?.choices[idx];
    
    if (choice?.points) {
      addPoints(choice.points);
    }

    if (!choice?.nextStepId) {
      setIsCompleted(true);
      if (selectedScenarioId) completeScenario(selectedScenarioId);
    }
  };

  const nextStep = () => {
    const choice = currentStep?.choices[selectedChoice!];
    if (choice?.nextStepId) {
      setCurrentStepId(choice.nextStepId);
      setSelectedChoice(null);
    }
  };

  const closeScenario = () => {
    setSelectedScenarioId(null);
    setCurrentStepId(null);
    setSelectedChoice(null);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-8 pb-12 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
        {selectedScenarioId && (
          <button 
            onClick={closeScenario}
            className="p-3 bg-card hover:bg-bg border border-border rounded-xl transition-all self-start"
          >
            <ArrowLeft className="w-5 h-5 text-accent-blue" />
          </button>
        )}
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-text-primary uppercase tracking-tighter italic">Tactical Simulations</h2>
          <p className="text-text-secondary text-sm font-medium">Practice real-time responses to advanced cyber threats.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedScenarioId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className="bento-card bento-accent-blue group hover:border-accent-blue hover:translate-y-[-4px] text-left"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-bg text-accent-blue rounded-xl flex items-center justify-center border border-border">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue">{scenario.topic}</span>
                </div>
                <h3 className="text-2xl font-black mb-3 text-text-primary italic tracking-tight uppercase group-hover:text-accent-blue transition-colors">
                  {scenario.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  Practice your decision making in: {scenario.topic}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                      <span className="text-[10px] font-bold text-text-secondary uppercase">Mission Ready</span>
                   </div>
                   <span className="text-accent-blue font-black text-xs uppercase tracking-widest">Execute Simulation →</span>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full"
          >
            <div className="space-y-6">
              <div className="bento-card bento-accent-purple !bg-card p-6 md:!p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-8">
                     <AlertTriangle className="text-accent-purple w-8 h-8" />
                     <span className="text-accent-purple font-black uppercase tracking-[0.3em] text-xs">Simulated Threat Vector</span>
                   </div>
                   <p className="text-xl md:text-2xl font-semibold leading-relaxed text-text-primary italic">
                     "{currentStep?.description}"
                   </p>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Terminal className="w-80 h-80 text-text-primary" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black text-text-secondary uppercase tracking-[0.2em] mb-4">Select Countermeasure</h3>
              <div className="space-y-4">
                {currentStep?.choices.map((choice, idx) => {
                  const isSelected = selectedChoice === idx;
                  const isCorrect = choice.isCorrect;

                  return (
                    <div key={idx} className="space-y-3">
                      <button
                        onClick={() => handleChoice(idx)}
                        disabled={selectedChoice !== null}
                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                          selectedChoice === null 
                            ? "border-border bg-card hover:border-accent-blue" 
                            : isSelected 
                              ? (isCorrect || choice.nextStepId) ? "border-accent-green bg-accent-green/5" : "border-accent-purple bg-accent-purple/5"
                              : "opacity-40 grayscale border-border bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between font-black text-sm uppercase tracking-wider text-text-primary">
                          {choice.text}
                          {selectedChoice !== null && isSelected && (
                            (isCorrect || choice.nextStepId) ? <CheckCircle className="text-accent-green w-6 h-6" /> : <AlertTriangle className="text-accent-purple w-6 h-6" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {selectedChoice !== null && isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`p-6 rounded-2xl border border-dashed ${(isCorrect || choice.nextStepId) ? 'bg-accent-green/10 border-accent-green/30' : 'bg-accent-purple/10 border-accent-purple/30'}`}
                          >
                             <p className={`font-black uppercase tracking-[0.2em] text-xs mb-2 ${(isCorrect || choice.nextStepId) ? 'text-accent-green' : 'text-accent-purple'}`}>
                               {(isCorrect || choice.nextStepId) ? "Mission Parameter Meta" : "Analysis Protocol Error"}
                             </p>
                             <p className="text-text-secondary text-sm leading-relaxed italic font-medium">"{choice.consequence}"</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              
              {selectedChoice !== null && (
                <div className="pt-6">
                  {currentStep?.choices[selectedChoice].nextStepId ? (
                    <button
                      onClick={nextStep}
                      className="w-full bg-accent-blue text-bg py-5 rounded-2xl font-black hover:scale-[1.02] transition-transform uppercase tracking-[0.3em] text-xs shadow-xl"
                    >
                      Advance to Next Node
                    </button>
                  ) : (
                    <button
                      onClick={closeScenario}
                      className="w-full bg-text-primary text-bg py-5 rounded-2xl font-black hover:scale-[1.02] transition-transform uppercase tracking-[0.3em] text-xs shadow-xl"
                    >
                      {isCompleted ? "End Simulation & Sync" : "Return to Control"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
