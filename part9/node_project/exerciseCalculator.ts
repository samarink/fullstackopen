interface RatingSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hours: Array<number>,
  target: number
): RatingSummary => {
  const periodLength = hours.length;
  const average = hours.reduce((a, b) => a + b) / hours.length;
  const rating = target - average > 0.5 ? 1 : 2;
  const ratingDescription = rating === 1 ? 'try more' : 'good enough';

  return {
    periodLength,
    trainingDays: hours.filter((h) => h != 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
