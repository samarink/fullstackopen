import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from '../ReviewItem';
import ItemSeparator from '../ItemSeparator';
import { GET_REPOSITORY_WITH_ID } from '../../graphql/queries';

const RepositoryView = () => {
  const [repository, setRepository] = useState(null);
  const { id } = useParams();
  const variables = { id, first: 2 };
  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY_WITH_ID, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  useEffect(() => {
    if (data) {
      setRepository(data.repository);
    }
  }, [data]);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReached = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReached}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default RepositoryView;
