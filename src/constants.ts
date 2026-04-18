import { QuizQuestion, Scenario, Badge } from './types';

export const BADGES: Badge[] = [
  { id: 'b1', name: 'First Mission', description: 'Complete your first security scenario.', iconName: 'Shield', requirement: 'Complete 1 scenario', unlocked: false },
  { id: 'b2', name: 'Quiz Master', description: 'Get a perfect score on any quiz.', iconName: 'Award', requirement: '100% on a quiz', unlocked: false },
  { id: 'b3', name: 'Privacy Pro', description: 'Solve all privacy-related challenges.', iconName: 'Lock', requirement: 'Complete all privacy challenges', unlocked: false },
  { id: 'b4', name: 'Guardian', description: 'Reach the Guardian rank.', iconName: 'Star', requirement: 'Reach 2000 points', unlocked: false },
  { id: 'b5', name: 'Net Sentinel', description: 'Use the AI chat to analyze a threat.', iconName: 'Zap', requirement: 'Use AI chat 3 times', unlocked: false },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'privacy',
    question: "You receive a message from a friend asking for your social media password so they can 'help' you with a game. What should you do?",
    options: [
      "Give it to them, they are a friend.",
      "Never share your password, even with friends.",
      "Give it but change it right after.",
      "Ask for their password in exchange."
    ],
    correctAnswer: 1,
    explanation: "Passwords should never be shared. Genuine friends and companies will never ask for your password.",
  },
  {
    id: 'q2',
    category: 'security',
    question: "What is the best way to create a strong password?",
    options: [
      "Use your pet's name.",
      "Use '12345678'.",
      "Use a mix of uppercase, lowercase, numbers, and symbols.",
      "Use your birthday."
    ],
    correctAnswer: 2,
    explanation: "A strong password contains a variety of characters to make it harder to guess by hackers.",
  },
  {
    id: 'q3',
    category: 'cyberbullying',
    question: "You see someone being mean to another student in a group chat. What is the most responsible action?",
    options: [
      "Join in so you don't get targeted.",
      "Stay quiet and ignore it.",
      "Take a screenshot and report it to a teacher or trusted adult.",
      "Argue back with the bully."
    ],
    correctAnswer: 2,
    explanation: "Reporting cyberbullying is crucial. Evidence (screenshots) helps adults help the victim.",
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: "Suspicious Email Alert",
    topic: "Phishing Detection",
    initialStepId: 'step1',
    steps: {
      'step1': {
        id: 'step1',
        description: "You receive an email from 'IT-Support@school-admin.com' saying your account will be locked in 1 hour unless you 'validate your credentials'. There is a big blue button: [VALIDATE NOW].",
        choices: [
          { text: "Check email details first", consequence: "Smart. You notice the domain is 'school-admin.com' but your school uses 'safe-academy.edu'.", nextStepId: 'step2' },
          { text: "Click the button immediately", consequence: "Risk! You are taken to a login page that looks identical to yours but has a different URL.", nextStepId: 'step3', isCorrect: false },
          { text: "Forward it to the real IT department", consequence: "Perfect action. You suspect phishing and inform the professionals.", isCorrect: true, points: 500 }
        ]
      },
      'step2': {
        id: 'step2',
        description: "Now that you know the domain is suspicious, you look closer. The email greeting is 'Dear Student' instead of your name. What's next?",
        choices: [
          { text: "Try to reply and ask for proof", consequence: "Reply-bait. This confirms your email is active to the attacker.", nextStepId: 'step3', isCorrect: false },
          { text: "Report the email as phishing", consequence: "Success! You identified the red flags (domain, generic greeting, urgent tone).", isCorrect: true, points: 500 }
        ]
      },
      'step3': {
        id: 'step3',
        description: "You are on the suspicious login page. It's asking for your school ID and your current password. The URL is 'http://validate-auth-portal.tk'.",
        choices: [
          { text: "Enter your credentials", consequence: "Mission Failed. Your account was hacked. IT had to reset your access.", isCorrect: false, points: 0 },
          { text: "Close the browser immediately", consequence: "Close call! You realized the URL was 'http' (not secure) and a weird domain.", isCorrect: true, points: 200 }
        ]
      }
    }
  },
  {
    id: 's2',
    title: "The Overshare Request",
    topic: "Social Engineering",
    initialStepId: 'step1',
    steps: {
      'step1': {
        id: 'step1',
        description: "A new friend you met on a game asks for your street address so they can send you a 'pro gamer' gaming chair as a surprise.",
        choices: [
          { text: "Give the address", consequence: "Major Risk! You shouldn't share physical locations with strangers online.", isCorrect: false, points: 0 },
          { text: "Politely decline", consequence: "Good. You set a boundary.", nextStepId: 'step2' },
          { text: "Ask them why they need it", consequence: "They say 'I just want to be generous! Trust me.'", nextStepId: 'step2' }
        ]
      },
      'step2': {
        id: 'step2',
        description: "They keep insisting and send you a photo of the 'chair'. It looks amazing. What do you do?",
        choices: [
          { text: "Explain you don't share personal info", consequence: "Solid security! Personal safety comes before cool gear.", isCorrect: true, points: 400 },
          { text: "Block them", consequence: "Extreme but safe. They were pushy about your private data.", isCorrect: true, points: 350 }
        ]
      }
    }
  }
];
