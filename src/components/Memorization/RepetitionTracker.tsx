import React, { useState } from 'react';
import { Plus, LucideIcon } from 'lucide-react';

interface RepetitionTrackerProps {
  icon: LucideIcon;
  title: string;
  color: string;
  currentRepetitions: number;
  targetRepetitions: number;
  onRepetition: (page: number) => void;
}

export function RepetitionTracker({
  icon: Icon,
  title,
  color,
  currentRepetitions,
  targetRepetitions,
  onRepetition
}: RepetitionTrackerProps) {
  const [page] = useState<number>(0);
  const progress = (currentRepetitions / targetRepetitions) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Icon className={`w-6 h-6 ml-3 ${color}`} />
          <span className="text-lg">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onRepetition(page)}
            disabled={currentRepetitions >= targetRepetitions}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentRepetitions >= targetRepetitions
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : `hover:opacity-80 ${color.replace('text', 'bg')}/10`
            }`}
          >
            <Plus className="w-5 h-5 ml-2" />
            تسجيل تكرار
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>تقدم التكرار</span>
          <span>{currentRepetitions}/{targetRepetitions} مرات</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color.replace('text', 'bg')} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}