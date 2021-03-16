export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensetivePatientEntry = Omit<PatientEntry, 'ssn'>;
