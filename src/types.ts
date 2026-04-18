export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requirement: string;
  unlocked: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'privacy' | 'cyberbullying' | 'security' | 'social';
}

export interface ScenarioStep {
  id: string;
  description: string;
  choices: {
    text: string;
    consequence: string;
    nextStepId?: string; // For branching
    isCorrect?: boolean;
    points?: number;
  }[];
}

export interface Scenario {
  id: string;
  title: string;
  topic: string;
  initialStepId: string;
  steps: { [id: string]: ScenarioStep };
}

export interface UserProgress {
  points: number;
  completedQuizzes: string[];
  completedScenarios: string[];
  badges: string[]; // Badge IDs
  rank: string;
}
