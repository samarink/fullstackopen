import diagnosesEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAll = (): Array<Diagnosis> => {
  return diagnosesEntries;
};

export default {
  getAll,
};
