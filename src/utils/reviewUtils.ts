import { Review } from '../types';

export function calculateNearReviews(memorizedThumns: number[]): number[] {
  // Return the last 24 memorized Thumns for near review
  return memorizedThumns.slice(-24);
}

export function calculateFarReviews(memorizedHizbs: number[]): number[] {
  // Calculate which Hizbs should be reviewed weekly
  // This is a simplified implementation
  return memorizedHizbs.filter((_, index) => index % 7 === 0);
}