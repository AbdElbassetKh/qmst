import React from 'react';
import { Brain, Repeat } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { MemorizationItem } from './MemorizationItem';
import { RepetitionTracker } from './RepetitionTracker';
import { hasCompletedNightPrep } from '../../utils/progressionUtils';

export function MemorizationProgress() {
  const { state, dispatch } = useProgress();
  const currentThumn = 1; // This should be calculated based on progress
  const canStartMemorization = hasCompletedNightPrep(state);

  const handleMemorization = (type: 'memorized' | 'repetition', page?: number) => {
    if (!canStartMemorization) return;
    
    dispatch({
      type: 'UPDATE_MEMORIZATION',
      payload: {
        thumnNumber: currentThumn,
        ...(type === 'memorized' ? { memorized: true } : { repetitions: (state.memorization[currentThumn]?.repetitions || 0) + 1 }),
        ...(page && { page })
      }
    });
  };

  const todayMemorization = state.memorization.find(
    memo => new Date(memo.date).toDateString() === new Date().toDateString()
  );

  if (!canStartMemorization) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">التحضير القبلي والحفظ</h2>
        <p className="text-gray-500 text-center py-4">
          يجب إكمال التحضير الليلي للثمن قبل بدء التحضير القبلي والحفظ
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">التحضير القبلي والحفظ</h2>
      <div className="space-y-4">
        <MemorizationItem
          icon={Brain}
          title="حفظ الثمن"
          color="text-purple-600"
          onClick={() => handleMemorization('memorized')}
          completed={todayMemorization?.memorized}
        />
        
        <RepetitionTracker
          icon={Repeat}
          title="تكرار الثمن"
          color="text-rose-600"
          currentRepetitions={todayMemorization?.repetitions || 0}
          targetRepetitions={10}
          onRepetition={(page) => handleMemorization('repetition', page)}
        />
      </div>
    </div>
  );
}