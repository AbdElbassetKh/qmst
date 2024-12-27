import React from 'react';
import { Book, Headphones, BookOpen } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { NightPrepItem } from './NightPrepItem';
import { hasCompletedWeeklyPrep } from '../../utils/progressionUtils';

export function NightPrep() {
  const { state, dispatch } = useProgress();
  const currentThumn = 1; // This should be calculated based on progress
  const canStartNightPrep = hasCompletedWeeklyPrep(state);

  const handleNightPrepUpdate = (type: 'tafseer' | 'listen' | 'read') => {
    if (!canStartNightPrep) return;
    
    dispatch({
      type: 'UPDATE_NIGHT_PREP',
      payload: { thumnNumber: currentThumn, type }
    });
  };

  const todayNightPrep = state.nightPrep.find(
    prep => new Date(prep.date).toDateString() === new Date().toDateString()
  );

  if (!canStartNightPrep) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">التحضير الليلي للثمن</h2>
        <p className="text-gray-500 text-center py-4">
          يجب إكمال دورة تحضير أسبوعي واحدة على الأقل قبل بدء التحضير الليلي
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">التحضير الليلي للثمن</h2>
      <div className="space-y-4">
        <NightPrepItem
          icon={Book}
          title="قراءة تفسير الثمن"
          color="text-emerald-600"
          onClick={() => handleNightPrepUpdate('tafseer')}
          completed={todayNightPrep?.readTafseer}
        />
        
        <NightPrepItem
          icon={Headphones}
          title="الاستماع إلى الثمن"
          color="text-blue-600"
          onClick={() => handleNightPrepUpdate('listen')}
          completed={todayNightPrep?.listenedToThumn}
        />
        
        <NightPrepItem
          icon={BookOpen}
          title="قراءة الثمن"
          color="text-indigo-600"
          onClick={() => handleNightPrepUpdate('read')}
          completed={todayNightPrep?.readThumn}
        />
      </div>
    </div>
  );
}