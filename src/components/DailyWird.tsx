import React from 'react';
import { CheckCircle, BookOpen, Headphones } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export function DailyWird() {
  const { state, dispatch } = useProgress();

  const handleReadJuz = () => {
    dispatch({ type: 'UPDATE_DAILY_WIRD', payload: { readJuz: true } });
  };

  const handleListenHizb = () => {
    dispatch({ type: 'UPDATE_DAILY_WIRD', payload: { listenHizb: true } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">الأوراد اليومية</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-green-600 ml-3" />
            <span className="text-lg">قراءة الجزء اليومي</span>
          </div>
          <button
            onClick={handleReadJuz}
            className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <CheckCircle className="w-5 h-5 ml-2" />
            تم
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Headphones className="w-6 h-6 text-blue-600 ml-3" />
            <span className="text-lg">سماع الحزب اليومي</span>
          </div>
          <button
            onClick={handleListenHizb}
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <CheckCircle className="w-5 h-5 ml-2" />
            تم
          </button>
        </div>
      </div>
    </div>
  );
}