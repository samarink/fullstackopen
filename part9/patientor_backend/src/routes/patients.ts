import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getNonSensetiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(400).json({ error: 'incorrect id' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: error.message });
  }
});

export default router;
