import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
import { parseArgs, calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseArguments([
      req.query.height as string,
      req.query.weight as string,
    ]);
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch (e) {
    res.json({ error: 'malformatted parameters' });
  }
});

app.get('/exercises', (req, res) => {
  try {
    const { target: target_passed, daily_exercises } = req.body; //eslint-disable-line
    const { target, hours } = parseArgs([target_passed, ...daily_exercises]); //eslint-disable-line
    res.json(calculateExercises(hours, target));
  } catch (e) {
    res.status(400).json({ error: e.message }); //eslint-disable-line
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
