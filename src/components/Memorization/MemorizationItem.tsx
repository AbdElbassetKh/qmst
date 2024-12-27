import React from 'react';
import { CheckCircle, LucideIcon } from 'lucide-react';

interface MemorizationItemProps {
  icon: LucideIcon;
  title: string;
  color: string;
  onClick: () => void;
  completed?: boolean;
}

export function MemorizationItem({ icon: Icon, title, color, onClick, completed }: MemorizationItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <Icon className={`w-6 h-6 ml-3 ${color}`} />
        <span className="text-lg">{title}</span>
      </div>
      <button
        onClick={onClick}
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