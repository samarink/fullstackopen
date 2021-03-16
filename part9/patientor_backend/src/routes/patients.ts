import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getNonSensetiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
