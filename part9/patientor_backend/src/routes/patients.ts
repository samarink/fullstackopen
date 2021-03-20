import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getAll());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(400).json({ error: 'incorrect id' });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, newEntry);

    res.json(addedEntry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.create(newPatient);

    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: error.message });
  }
});

export default router;
