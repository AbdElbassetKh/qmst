import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export function WeeklyPrep() {
  const { state, dispatch } = useProgress();
  const currentHizb = 1; // This should be calculated based on progress

  const handleDayComplete = () => {
    dispatch({
      type: 'UPDATE_WEEKLY_PREP',
      payload: { hizbNumber: currentHizb, day: new Date().toISOString() }
    });
  };

  const currentPrep = state.weeklyPrep.find(prep => prep.hizbNumber === currentHizb);
  const daysCompleted = currentPrep?.readingDays.length || 0;
  const progress = (daysCompleted / 8) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">التحضير الأسبوعي</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-purple-600 ml-3" />
            <span className="text-lg">قراءة الحزب المراد حفظه</span>
          </div>
          <button
            onClick={handleDayComplete}
            disabled={daysCompleted >= 8}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              daysCompleted >= 8
                ? 'bg-green-100 text-green-700'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            <CheckCircle className="w-5 h-5 ml-2" />
            {daysCompleted >= 8 ? 'مكتمل' : 'تم'}
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">تقدم التحضير الأسبوعي</span>
            <span className="text-sm font-medium">{daysCompleted}/8 أيام</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}