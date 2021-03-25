import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    client.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
