import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import ItemSeparator from '../ItemSeparator';
import { GET_REPOSITORY_WITH_ID } from '../../graphql/queries';

const RepositoryView = () => {
  const [repository, setRepository] = useState(null);
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY_WITH_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setRepository(data.repository);
    }
  }, [data]);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default RepositoryView;
