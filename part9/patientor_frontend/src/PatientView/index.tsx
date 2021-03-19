import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { Patient /*Diagnosis*/ } from '../types';
import EntryDetails from './EntryDetails';
import { apiBaseUrl } from '../constants';

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  /* const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]); */
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: returnedPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(returnedPatient);
    };

    /* const fetchDiagnoses = async () => { */
    /*   const { data: diagnoses } = await axios.get<Diagnosis[]>( */
    /*     `${apiBaseUrl}/diagnoses` */
    /*   ); */
    /*   setDiagnoses(diagnoses); */
    /* }; */

    void fetchPatient();
    /* void fetchDiagnoses(); */
  }, []);

  if (!patient) return null;

  return (
    <Container>
      <h2>
        {patient.name}
        <Icon name={patient.gender === 'male' ? 'mars' : 'venus'}></Icon>
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries && patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <ul></ul>
    </Container>
  );
};

export default PatientView;
