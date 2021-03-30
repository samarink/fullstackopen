import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const defaultVariables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  variables = variables || defaultVariables;

  const { loading, data, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { ...variables },
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    refetch,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
