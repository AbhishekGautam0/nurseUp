
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type Test, type Question } from '@/lib/data';
import { initialTests } from '@/lib/data';

export type AnswersState = { [questionId: string]: string[] };

type TestResult = {
  answers: AnswersState;
  submittedAt: string; // Using ISO string for serialization
};

type User = {
    name: string;
    email: string;
}

// Group results by user email
type AllResults = {
    [email: string]: {
        [testId: string]: TestResult;
    }
}

type TestStore = {
  user: User;
  setUser: (name: string, email: string) => void;
  tests: Test[];
  addTest: (test: Test) => void;
  deleteTest: (testId: string) => void;
  getTest: (testId: string) => Test | undefined;
  results: AllResults;
  getTestResult: (testId: string) => TestResult | undefined;
  getResultsForCurrentUser: () => {[testId: string]: TestResult};
  setTestResult: (testId: string, answers: AnswersState) => void;
};

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      user: { name: 'Student Nurse', email: '' }, // Email is empty until login
      setUser: (name, email) => set({ user: { name, email } }),
      tests: initialTests,
      addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
      deleteTest: (testId) => {
        const currentUserEmail = get().user.email;
        const newResults = { ...get().results };
        if (newResults[currentUserEmail]) {
          delete newResults[currentUserEmail][testId];
        }
        set((state) => ({
          tests: state.tests.filter(t => t.id !== testId),
          results: newResults
        }));
      },
      getTest: (testId: string) => get().tests.find((t) => t.id === testId),
      results: {}, // Results are now stored under user's email
      getTestResult: (testId: string) => {
        const currentUserEmail = get().user.email;
        if (!currentUserEmail) return undefined;
        return get().results[currentUserEmail]?.[testId];
      },
      getResultsForCurrentUser: () => {
        const currentUserEmail = get().user.email;
        if (!currentUserEmail) return {};
        return get().results[currentUserEmail] || {};
      },
      setTestResult: (testId, answers) => {
        const currentUserEmail = get().user.email;
        if (!currentUserEmail) return;

        set((state) => {
          const userResults = state.results[currentUserEmail] || {};
          return {
            results: {
              ...state.results,
              [currentUserEmail]: {
                ...userResults,
                [testId]: {
                  answers,
                  submittedAt: new Date().toISOString(),
                },
              },
            },
          }
        });
      },
    }),
    {
      name: 'nurseup-test-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
