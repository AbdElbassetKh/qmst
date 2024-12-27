import React from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { DailyWird } from './components/DailyWird';
import { WeeklyPrep } from './components/WeeklyPrep';
import { NightPrep } from './components/NightPrep/NightPrep';
import { MemorizationProgress } from './components/Memorization/MemorizationProgress';
import { ReviewProgress } from './components/Review/ReviewProgress';

export default function App() {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">متابعة حفظ القرآن الكريم</h1>
            <p className="text-gray-600">تتبع تقدمك في حفظ كتاب الله</p>
          </header>
          
          <main>
            <DailyWird />
            <WeeklyPrep />
            <NightPrep />
            <MemorizationProgress />
            <ReviewProgress />
          </main>
        </div>
      </div>
    </ProgressProvider>
  );
}