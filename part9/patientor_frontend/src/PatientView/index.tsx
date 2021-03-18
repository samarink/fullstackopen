import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: returnedPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(returnedPatient);
    };

    void fetchPatient();
  });

  if (!patient) return null;

  return (
    <Container>
      <h2>
        {patient.name}
        <Icon name={patient.gender === 'male' ? 'mars' : 'venus'}></Icon>
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </Container>
  );
};

export default PatientView;