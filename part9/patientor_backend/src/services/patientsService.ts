import patientsEntries from '../data/patients';
import { NonSensetivePatientEntry } from '../types';

const getNonSensetiveEntries = (): NonSensetivePatientEntry[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

export default {
  getNonSensetiveEntries,
};
