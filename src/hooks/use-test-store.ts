
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type Test, type Question } from '@/lib/data';
import { initialTests } from '@/lib/data';

export type AnswersState = { [questionId: string]: string[] };

type TestResult = {
  answers: AnswersState;
  submittedAt: string; // Using ISO string for serialization
};

type TestStore = {
  tests: Test[];
  addTest: (test: Test) => void;
  getTest: (testId: string) => Test | undefined;
  results: {
    [testId: string]: TestResult;
  };
  getTestResult: (testId: string) => TestResult | undefined;
  setTestResult: (testId: string, answers: AnswersState) => void;
};

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      tests: initialTests,
      addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
      getTest: (testId: string) => get().tests.find((t) => t.id === testId),
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
