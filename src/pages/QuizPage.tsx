import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../constants';
import { ShieldCheck, ArrowRight, RotateCcw, Award, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { useUserProgress } from '../contexts/UserProgressContext';

export default function QuizPage() {
  const [quizIteration, setQuizIteration] = useState(0);
  const shuffledQuestions = useMemo(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [quizIteration]);

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const { addPoints, completeQuiz } = useUserProgress();
  const currentQuestion = shuffledQuestions[currentStep];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
      addPoints(100);
    }
  };

  const handleNext = () => {
    if (currentStep < shuffledQuestions.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      completeQuiz('global_audit', score === shuffledQuestions.length);
    }
  };

  const resetQuiz = () => {
    setQuizIteration(prev => prev + 1);
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bento-card bento-accent-green !bg-card text-center p-8 md:p-16"
      >
        <div className="w-24 h-24 bg-accent-green/10 rounded-3xl flex items-center justify-center text-accent-green mx-auto mb-8 border-4 border-accent-green/20">
          <Trophy className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-text-primary tracking-tighter uppercase italic mb-4">Training Deployed</h2>
        <p className="text-text-secondary font-medium mb-12">System evaluation complete. Results verified by AI Guard.</p>
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-bg border border-border rounded-2xl">
            <p className="text-[10px] text-accent-blue font-black uppercase tracking-[0.2em] mb-2">Accuracy</p>
            <p className="text-3xl font-black text-text-primary">{Math.round((score / shuffledQuestions.length) * 100)}%</p>
          </div>
          <div className="p-6 bg-bg border border-border rounded-2xl">
            <p className="text-[10px] text-accent-green font-black uppercase tracking-[0.2em] mb-2">XP Earned</p>
            <p className="text-3xl font-black text-text-primary">+{score * 100}</p>
          </div>
        </div>

        <button 
          onClick={resetQuiz}
          className="bg-accent-blue text-bg px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:scale-105 transition-transform shadow-xl"
        >
          Re-Initialize Node
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue border border-accent-blue/20">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-text-primary tracking-tighter uppercase italic">Security Audit</h2>
            <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Session #{currentStep + 1} of {shuffledQuestions.length}</p>
          </div>
        </div>
        <div className="bg-card border border-border p-3 px-5 rounded-2xl flex items-center justify-center gap-3">
          <Award className="text-accent-green w-5 h-5" />
          <span className="text-xs font-black text-text-primary tracking-tight whitespace-nowrap">{score * 100} SP COLLECTED</span>
        </div>
      </div>

      <div className="bento-card bento-accent-blue !bg-card !p-0 overflow-hidden min-h-[500px] flex flex-col">
        <div className="h-2 w-full bg-border">
          <motion.div 
            animate={{ width: `${((currentStep + 1) / shuffledQuestions.length) * 100}%` }}
            className="h-full bg-accent-blue shadow-[0_0_15px_rgba(56,189,248,0.5)]" 
          />
        </div>
        
        <div className="p-8 md:p-14 flex-1">
          <h3 className="text-xl md:text-3xl font-black mb-10 text-text-primary leading-[1.2] italic tracking-tight">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;
              
              let bgColor = "hover:bg-accent-blue/5 hover:border-accent-blue/30";
              let borderColor = "border-border";
              let textColor = "text-text-secondary";

              if (isSelected) {
                bgColor = "bg-accent-blue/10";
                borderColor = "border-accent-blue shadow-[0_4px_12px_rgba(56,189,248,0.2)]";
                textColor = "text-accent-blue";
              }

              if (isAnswered) {
                if (isCorrect) {
                  bgColor = "bg-accent-green/10";
                  borderColor = "border-accent-green";
                  textColor = "text-accent-green";
                } else if (isSelected) {
                  bgColor = "bg-accent-purple/10";
                  borderColor = "border-accent-purple";
                  textColor = "text-accent-purple";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${bgColor} ${borderColor} ${textColor}`}
                >
                  <span className="font-bold text-sm uppercase tracking-wide">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="text-accent-green w-6 h-6" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="text-accent-purple w-6 h-6" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-10 p-8 rounded-2xl border border-dashed ${selectedOption === currentQuestion.correctAnswer ? 'bg-accent-green/5 border-accent-green/30' : 'bg-bg border-border'}`}
              >
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue">Decryption Result</p>
                </div>
                <p className="text-text-secondary leading-relaxed italic text-sm font-medium">"{currentQuestion.explanation}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-bg/50 border-t border-border flex justify-end gap-4">
          {!isAnswered ? (
            <button
              disabled={selectedOption === null}
              onClick={handleConfirm}
              className="bg-accent-blue text-bg px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform disabled:opacity-30 disabled:grayscale"
            >
              Verify Pulse
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-3 bg-text-primary text-bg px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform"
            >
              {currentStep < shuffledQuestions.length - 1 ? "Next Node" : "Access Summary"} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
