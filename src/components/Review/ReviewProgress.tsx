import React from 'react';
import { BookMarked, BookOpen } from 'lucide-react';
import { ReviewSection } from './ReviewSection';
import { useProgress } from '../../context/ProgressContext';

export function ReviewProgress() {
  const { state, dispatch } = useProgress();

  const handleReview = (type: 'near' | 'far', number: number) => {
    dispatch({
      type: 'UPDATE_REVIEW',
      payload: { type, number }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">تتبع المراجعة</h2>
      <div className="space-y-6">
        <ReviewSection
          icon={BookMarked}
          title="المراجعة القريبة"
          color="text-emerald-600"
          items={state.reviews.filter(r => r.type === 'near')}
          onComplete={(number) => handleReview('near', number)}
          type="thumn"
        />
        
        <ReviewSection
          icon={BookOpen}
          title="المراجعة البعيدة"
          color="text-blue-600"
          items={state.reviews.filter(r => r.type === 'far')}
          onComplete={(number) => handleReview('far', number)}
          type="hizb"
        />
      </div>
    </div>
  );
}