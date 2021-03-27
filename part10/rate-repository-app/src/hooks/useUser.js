import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useUser = () => {
  const [user, setUser] = useState();

  const { loading, data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) setUser(data.authorizedUser);
  }, [data]);

  return { user, loading, refetch };
};

export default useUser;
