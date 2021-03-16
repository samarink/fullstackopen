import patientsEntries from '../../data/patients';
import {
  NewPatientEntry,
  PatientEntry,
  NonSensetivePatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...entry,
  };

  patientsEntries.push(newPatient);
  return newPatient;
};

export default {
  getNonSensetiveEntries,
  addPatient,
};
