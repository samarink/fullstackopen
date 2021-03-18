import patientsEntries from '../../data/patients';
import {
  NewPatientEntry,
  PatientEntry,
  NonSensetivePatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensetiveEntries = (): NonSensetivePatientEntry[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
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

const getById = (id: string): PatientEntry | undefined => {
  const patient: PatientEntry | undefined = patientsEntries.find(
    (p) => p.id === id
  );

  return patient;
};

export default {
  getNonSensetiveEntries,
  addPatient,
  getById,
};
