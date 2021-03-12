interface Parametes {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Parametes => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const index = weight / (height / 100) ** 2;

  if (index < 18.5) return 'Underweight';
  else if (index < 25) return 'Normal weight';
  else if (index < 30) return 'Overweight';
  else return 'Obese';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
