import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) =>
    mutate({ variables: { credentials: { username, password } } });

  return [signIn, result];
};

export default useSignIn;
