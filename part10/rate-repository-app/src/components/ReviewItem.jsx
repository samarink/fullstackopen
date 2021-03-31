import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import format from 'date-fns/format';
import Text from './Text';
import theme from '../theme';

const ratingContainerWidth = 50;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  ratingContainer: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: ratingContainerWidth / 2,
    padding: theme.paddings.medium,
    margin: theme.margins.medium,
    width: ratingContainerWidth,
    height: ratingContainerWidth,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.paddings.medium,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  button: {
    padding: theme.paddings.large,
    flexGrow: 1,
    margin: theme.margins.medium,
    borderRadius: 5,
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  reviewContainer: {
    flexShrink: 1,
    padding: theme.paddings.medium,
  },
});

const ReviewItem = ({ review, includeButtons, handleDelete }) => {
  const { id, text, rating, createdAt, user, repository } = review;
  const readableDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <>
      <View style={style.container}>
        <View style={style.ratingContainer}>
          <Text fontWeight="bold" style={style.ratingText}>
            {rating}
          </Text>
        </View>

        <View style={style.reviewContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {user.username}
          </Text>
          <Text color="textSecondary">{readableDate}</Text>
          <Text style={style.reviewText}>{text}</Text>
        </View>
      </View>

      {includeButtons && (
        <View style={style.buttonsContainer}>
          <Pressable style={[style.button, style.viewButton]}>
            <Link to={`/repository/${repository.id}`}>
              <Text color="white" fontWeight="bold" fontSize="subheading">
                View Repository
              </Text>
            </Link>
          </Pressable>

          <Pressable
            onPress={() => handleDelete(id)}
            style={[style.button, style.deleteButton]}
          >
            <Text color="white" fontWeight="bold" fontSize="subheading">
              Delete Review
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ReviewItem;
