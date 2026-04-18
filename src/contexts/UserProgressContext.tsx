import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, Badge } from '../types';
import { BADGES } from '../constants';

interface UserProgressContextType {
  progress: UserProgress;
  addPoints: (points: number) => void;
  completeQuiz: (quizId: string, perfect: boolean) => void;
  completeScenario: (scenarioId: string) => void;
  unlockBadge: (badgeId: string) => void;
  useGemini: () => void;
}

const INITIAL_PROGRESS: UserProgress = {
  points: 0,
  completedQuizzes: [],
  completedScenarios: [],
  badges: [],
  rank: 'Junior Defender'
};

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('user_progress');
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  const [geminiCount, setGeminiCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('user_progress', JSON.stringify(progress));
  }, [progress]);

  const addPoints = (amount: number) => {
    setProgress(prev => {
      const newPoints = prev.points + amount;
      let newRank = prev.rank;
      if (newPoints >= 2000) newRank = 'Guardian';
      else if (newPoints >= 1000) newRank = 'Sentinel';
      else if (newPoints >= 500) newRank = 'Defender';

      // Check for Guardian badge
      const newBadges = [...prev.badges];
      if (newPoints >= 2000 && !newBadges.includes('b4')) {
        newBadges.push('b4');
      }

      return { ...prev, points: newPoints, rank: newRank, badges: newBadges };
    });
  };

  const completeQuiz = (quizId: string, perfect: boolean) => {
    setProgress(prev => {
      const newQuizzes = prev.completedQuizzes.includes(quizId) 
        ? prev.completedQuizzes 
        : [...prev.completedQuizzes, quizId];
      
      const newBadges = [...prev.badges];
      if (perfect && !newBadges.includes('b2')) {
        newBadges.push('b2');
      }

      return { ...prev, completedQuizzes: newQuizzes, badges: newBadges };
    });
  };

  const completeScenario = (scenarioId: string) => {
    setProgress(prev => {
      const newScenarios = prev.completedScenarios.includes(scenarioId)
        ? prev.completedScenarios
        : [...prev.completedScenarios, scenarioId];
      
      const newBadges = [...prev.badges];
      if (newScenarios.length >= 1 && !newBadges.includes('b1')) {
        newBadges.push('b1');
      }

      return { ...prev, completedScenarios: newScenarios, badges: newBadges };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setProgress(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  };

  const useGemini = () => {
    setGeminiCount(prev => {
      const newVal = prev + 1;
      if (newVal >= 3 && !progress.badges.includes('b5')) {
        unlockBadge('b5');
      }
      return newVal;
    });
  };

  return (
    <UserProgressContext.Provider value={{ progress, addPoints, completeQuiz, completeScenario, unlockBadge, useGemini }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) throw new Error('useUserProgress must be used within a UserProgressProvider');
  return context;
};
