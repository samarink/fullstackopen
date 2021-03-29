import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const defaultVariables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  variables = variables || defaultVariables;

  const [repositories, setRepositories] = useState();

  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { ...variables },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) setRepositories(data.repositories);
  }, [data]);

  return { repositories, loading, refetch };
};

export default useRepositories;
