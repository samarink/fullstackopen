export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JournalEntry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: JournalEntry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensetivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
