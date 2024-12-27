export interface DailyWird {
  readJuz: boolean;
  listenHizb: boolean;
  date: string;
}

export interface WeeklyPreparation {
  hizbNumber: number;
  readingDays: string[];
  completed: boolean;
}

export interface NightPreparation {
  thumnNumber: number;
  readTafseer: boolean;
  listenedToThumn: boolean;
  readThumn: boolean;
  date: string;
}

export interface Memorization {
  thumnNumber: number;
  memorized: boolean;
  repetitions: number;
  page: number;
  date: string;
}

export interface Review {
  type: 'near' | 'far';
  thumnNumber?: number;
  hizbNumber?: number;
  completed: boolean;
  date: string;
}

export interface ProgressState {
  dailyWird: DailyWird[];
  weeklyPrep: WeeklyPreparation[];
  nightPrep: NightPreparation[];
  memorization: Memorization[];
  reviews: Review[];
}