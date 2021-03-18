import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(diagnosesService.getAll());
});

export default router;
