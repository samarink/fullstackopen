import diagnosesEntries from '../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnosesEntries;
};

export default {
  getEntries,
};
