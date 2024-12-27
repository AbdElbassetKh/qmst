import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ProgressState } from '../types';

type Action =
  | { type: 'UPDATE_DAILY_WIRD'; payload: { readJuz?: boolean; listenHizb?: boolean } }
  | { type: 'UPDATE_WEEKLY_PREP'; payload: { hizbNumber: number; day: string } }
  | { type: 'UPDATE_NIGHT_PREP'; payload: { thumnNumber: number; type: 'tafseer' | 'listen' | 'read' } }
  | { type: 'UPDATE_MEMORIZATION'; payload: { thumnNumber: number; memorized?: boolean; repetitions?: number; page?: number } }
  | { type: 'UPDATE_REVIEW'; payload: { type: 'near' | 'far'; number: number } };

const initialState: ProgressState = {
  dailyWird: [],
  weeklyPrep: [],
  nightPrep: [],
  memorization: [],
  reviews: []
};

const ProgressContext = createContext<{
  state: ProgressState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function progressReducer(state: ProgressState, action: Action): ProgressState {
  switch (action.type) {
    case 'UPDATE_DAILY_WIRD':
      return {
        ...state,
        dailyWird: [
          ...state.dailyWird,
          {
            readJuz: action.payload.readJuz ?? false,
            listenHizb: action.payload.listenHizb ?? false,
            date: new Date().toISOString()
          }
        ]
      };
    
    case 'UPDATE_WEEKLY_PREP': {
      const today = new Date().toISOString();
      const existingPrep = state.weeklyPrep.find(
        prep => prep.hizbNumber === action.payload.hizbNumber
      );

      if (existingPrep) {
        // Add the new day to existing reading days if not already present
        const updatedReadingDays = existingPrep.readingDays.includes(today) 
          ? existingPrep.readingDays 
          : [...existingPrep.readingDays, today];

        // Mark as completed if we have 8 days of reading
        const completed = updatedReadingDays.length >= 8;

        return {
          ...state,
          weeklyPrep: state.weeklyPrep.map(prep =>
            prep.hizbNumber === action.payload.hizbNumber
              ? {
                  ...prep,
                  readingDays: updatedReadingDays,
                  completed
                }
              : prep
          )
        };
      }

      // Create new weekly prep entry
      return {
        ...state,
        weeklyPrep: [
          ...state.weeklyPrep,
          {
            hizbNumber: action.payload.hizbNumber,
            readingDays: [today],
            completed: false
          }
        ]
      };
    }

    case 'UPDATE_NIGHT_PREP': {
      const today = new Date().toISOString();
      const existingPrep = state.nightPrep.find(
        prep => new Date(prep.date).toDateString() === new Date(today).toDateString()
      );

      if (existingPrep) {
        return {
          ...state,
          nightPrep: state.nightPrep.map(prep =>
            new Date(prep.date).toDateString() === new Date(today).toDateString()
              ? {
                  ...prep,
                  readTafseer: action.payload.type === 'tafseer' ? true : prep.readTafseer,
                  listenedToThumn: action.payload.type === 'listen' ? true : prep.listenedToThumn,
                  readThumn: action.payload.type === 'read' ? true : prep.readThumn
                }
              : prep
          )
        };
      }

      return {
        ...state,
        nightPrep: [
          ...state.nightPrep,
          {
            thumnNumber: action.payload.thumnNumber,
            readTafseer: action.payload.type === 'tafseer',
            listenedToThumn: action.payload.type === 'listen',
            readThumn: action.payload.type === 'read',
            date: today
          }
        ]
      };
    }

    case 'UPDATE_MEMORIZATION': {
      const today = new Date().toISOString();
      const existingMemo = state.memorization.find(
        memo => new Date(memo.date).toDateString() === new Date(today).toDateString()
      );

      if (existingMemo) {
        return {
          ...state,
          memorization: state.memorization.map(memo =>
            new Date(memo.date).toDateString() === new Date(today).toDateString()
              ? {
                  ...memo,
                  ...(action.payload.memorized !== undefined && { memorized: action.payload.memorized }),
                  ...(action.payload.repetitions !== undefined && { repetitions: action.payload.repetitions }),
                  ...(action.payload.page !== undefined && { page: action.payload.page })
                }
              : memo
          )
        };
      }

      return {
        ...state,
        memorization: [
          ...state.memorization,
          {
            thumnNumber: action.payload.thumnNumber,
            memorized: action.payload.memorized ?? false,
            repetitions: action.payload.repetitions ?? 0,
            page: action.payload.page ?? 1,
            date: today
          }
        ]
      };
    }

    case 'UPDATE_REVIEW': {
      const today = new Date().toISOString();
      return {
        ...state,
        reviews: [
          ...state.reviews,
          {
            type: action.payload.type,
            ...(action.payload.type === 'near' 
              ? { thumnNumber: action.payload.number }
              : { hizbNumber: action.payload.number }
            ),
            completed: true,
            date: today
          }
        ]
      };
    }

    default:
      return state;
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('quranProgress');
    if (savedState) {
      // Initialize with saved state
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quranProgress', JSON.stringify(state));
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}