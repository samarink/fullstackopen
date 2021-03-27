import React from 'react';
import { View, StyleSheet } from 'react-native';
import format from 'date-fns/format'
import Text from '../Text';
import theme from '../../theme';

const ratingContainerWidth = 50;

const style = StyleSheet.create({
  conttainer: {
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
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  reviewContainer: {
    flexShrink: 1,
    padding: theme.paddings.medium
  },
});

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review;
  const readableDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <View style={style.conttainer}>
      <View style={style.ratingContainer}>
        <Text fontWeight="bold" style={style.ratingText}>{rating}</Text>
      </View>

      <View style={style.reviewContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {user.username}
        </Text>
        <Text color="textSecondary">{readableDate}</Text>
          <Text style={style.reviewText}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
