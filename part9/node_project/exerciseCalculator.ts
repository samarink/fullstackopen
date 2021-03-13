interface ExerciseValues {
  hours: Array<number>;
  target: number;
}

interface RatingSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const numArgs = args.slice(2).map((arg) => Number(arg));
  const filtered = numArgs.filter((hour) => !isNaN(hour));

  if (numArgs.length !== filtered.length) {
    throw new Error('Provided arguments were not numbers');
  } else {
    return {
      target: numArgs[0],
      hours: numArgs.slice(1),
    };
  }
};

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

// https://github.com/palantir/tslint/issues/3010
const isNodeError = (error: Error): error is NodeJS.ErrnoException =>
  error instanceof Error;

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  if (isNodeError(e) && e.code === 'ENOENT') {
    console.log('Error, something bad happened, message: ', e.message);
  }
}

