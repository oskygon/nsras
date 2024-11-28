import { create } from 'zustand';

interface ScoreState {
  scores: Record<string, number>;
  totalScore: number;
  evaluationCount: number;
  setScore: (category: string, value: number) => boolean;
  resetScores: () => void;
  incrementEvaluationCount: () => void;
}

export const useScoreStore = create<ScoreState>((set) => ({
  scores: {},
  totalScore: 0,
  evaluationCount: 0,
  setScore: (category, value) => {
    let isComplete = false;
    set((state) => {
      const newScores = { ...state.scores, [category]: value };
      const total = Object.values(newScores).reduce((sum, curr) => sum + curr, 0);
      
      const requiredCategories = ['cfg','e_mental','mobility', 'activity', 'nutrition', 'humidity'];
      isComplete = requiredCategories.every(cat => newScores[cat] !== undefined);
      
      return { scores: newScores, totalScore: total };
    });
    return isComplete;
  },
  resetScores: () => set({ scores: {}, totalScore: 0 }),
  incrementEvaluationCount: () => set((state) => ({ evaluationCount: state.evaluationCount + 1 })),
}));