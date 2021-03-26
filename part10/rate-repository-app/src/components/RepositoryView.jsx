import React, { useState, useEffect } from 'react';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY_WITH_ID } from '../graphql/queries';

const RepositoryView = () => {
  const [repository, setRepository] = useState(null);
  const { id } = useParams();
  const result = useQuery(GET_REPOSITORY_WITH_ID, { variables: { id } });

  useEffect(() => {
    if (result.data) setRepository(result.data.repository);
  }, [result]);

  if (!repository) return null;

  return <RepositoryItem fullView {...repository} />;
};

export default RepositoryView;
