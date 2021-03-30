import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './RepositoryView/ReviewItem';
import ItemSeparator from './ItemSeparator';
import useUser from '../hooks/useUser';

const MyReviews = () => {
  const [reviews, setReviews] = useState();
  const { user } = useUser({ includeReviews: true });

  useEffect(() => {
    if (user) {
      setReviews(user.reviews);
    }
  }, [user]);

  const reviewsNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
