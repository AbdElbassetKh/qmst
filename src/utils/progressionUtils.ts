import { ProgressState } from '../types';

export function hasCompletedWeeklyPrep(state: ProgressState): boolean {
  // Check if there's at least one complete weekly preparation cycle
  const weeklyPreps = state.weeklyPrep;
  return weeklyPreps.some(prep => prep.completed);
}

export function hasCompletedNightPrep(state: ProgressState): boolean {
  // Check if night preparation is complete for the current Thumn
  const today = new Date().toDateString();
  const nightPrep = state.nightPrep.find(
    prep => new Date(prep.date).toDateString() === today
  );
  
  return nightPrep ? 
    nightPrep.readTafseer && 
    nightPrep.listenedToThumn && 
    nightPrep.readThumn : 
    false;
}