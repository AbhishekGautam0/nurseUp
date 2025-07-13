import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AnswersState = { [questionId: string]: string[] };

type TestResult = {
  answers: AnswersState;
  submittedAt: string; // Using ISO string for serialization
};

type TestStore = {
  results: {
    [testId: string]: TestResult;
  };
  getTestResult: (testId: string) => TestResult | undefined;
  setTestResult: (testId: string, answers: AnswersState) => void;
};

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      results: {},
      getTestResult: (testId: string) => get().results[testId],
      setTestResult: (testId, answers) =>
        set((state) => ({
          results: {
            ...state.results,
            [testId]: {
              answers,
              submittedAt: new Date().toISOString(),
            },
          },
        })),
    }),
    {
      name: 'nurseup-test-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
