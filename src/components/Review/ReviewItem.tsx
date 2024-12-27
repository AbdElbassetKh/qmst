import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ReviewItemProps {
  number: number;
  completed: boolean;
  onComplete: (number: number) => void;
  type: 'thumn' | 'hizb';
  color: string;
}

export function ReviewItem({ number, completed, onComplete, type, color }: ReviewItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span className="text-lg">
        {type === 'thumn' ? `الثمن ${number}` : `الحزب ${number}`}
      </span>
      <button
        onClick={() => onComplete(number)}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          completed 
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : `hover:opacity-80 ${color.replace('text', 'bg')}/10`
        }`}
      >
        <CheckCircle className="w-5 h-5 ml-2" />
        {completed ? 'تم' : 'تسجيل'}
      </button>
    </div>
  );
}