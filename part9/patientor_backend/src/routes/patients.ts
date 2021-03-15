import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(patientsService.getNonSensetiveEntries());
});

export default router;
