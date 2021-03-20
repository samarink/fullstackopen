import patientsEntries from '../../data/patients';
import { NewPatient, Patient, PublicPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): PublicPatient[] => {
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

const create = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = { id, ...entry };

  patientsEntries.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewPatient): Entry | false => {
  const patient: Patient | undefined = getById(id);
  const entryId: string = uuid();
  const newEntry: Entry = { entryId, ...entry };

  if (!patient) return false;
  patient.entries.push(newEntry);
  return newEntry;
};

const getById = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patientsEntries.find((p) => p.id === id);

  return patient;
};

export default {
  getAll,
  create,
  getById,
  addEntry,
};
