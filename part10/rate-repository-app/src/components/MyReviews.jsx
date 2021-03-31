import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
import useUser from '../hooks/useUser';
import useDeleteReview from '../hooks/useDeleteReview';

const MyReviews = () => {
  const [reviews, setReviews] = useState();
  const [deleteReview] = useDeleteReview();
  const { user, refetch } = useUser({ includeReviews: true });

  useEffect(() => {
    if (user) {
      setReviews(user.reviews);
    }
  }, [user]);

  const reviewsNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Review',
      `Are you sure you want to delete this review`,
      [
        {
          text: 'CANCEL',
          onPress: () => false,
        },
        {
          text: 'DELETE',
          onPress: () => {
            deleteReview(id);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} includeButtons handleDelete={handleDelete} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
