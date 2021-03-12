const calculateBmi = (height: number, weight: number): string => {
  const index = weight / (height / 100) ** 2;

  if (index < 18.5) return 'Underweight';
  else if (index < 25) return 'Normal weight';
  else if (index < 30) return 'Overweight';
  else return 'Obese';
};

console.log(calculateBmi(180, 74));
