import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ReviewItem } from './ReviewItem';
import { Review } from '../../types';

interface ReviewSectionProps {
  icon: LucideIcon;
  title: string;
  color: string;
  items: Review[];
  onComplete: (number: number) => void;
  type: 'thumn' | 'hizb';
}

export function ReviewSection({ icon: Icon, title, color, items, onComplete, type }: ReviewSectionProps) {
  const todayItems = items.filter(
    item => new Date(item.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-6 h-6 ${color}`} />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      {todayItems.length > 0 ? (
        <div className="space-y-2">
          {todayItems.map((item) => (
            <ReviewItem
              key={`${item.type}-${item.thumnNumber || item.hizbNumber}`}
              number={type === 'thumn' ? item.thumnNumber! : item.hizbNumber!}
              completed={item.completed}
              onComplete={onComplete}
              type={type}
              color={color}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">لا توجد مراجعات لهذا اليوم</p>
      )}
    </div>
  );
}