/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getNonSensetiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, occupation, gender } = req.body;
  const newPatientEntry = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    occupation,
    gender,
  });
  res.json(newPatientEntry);
});

export default router;
