import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useUser = (variables) => {
  const { loading, data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    user: data?.authorizedUser,
    loading,
    refetch,
  };
};

export default useUser;
