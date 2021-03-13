interface Parametes {
  height: number;
  weight: number;
}

export const parseArguments = (args: Array<string>): Parametes => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const index = weight / (height / 100) ** 2;

  if (index < 18.5) return 'Underweight';
  else if (index < 25) return 'Normal weight';
  else if (index < 30) return 'Overweight';
  else return 'Obese';
};
