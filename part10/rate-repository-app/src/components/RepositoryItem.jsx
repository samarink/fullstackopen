import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: theme.paddings.large,
  },
  logo: {
    borderRadius: 5,
    width: 66,
    height: 58,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: theme.margins.medium,
  },
  headerTextContent: {
    paddingLeft: theme.paddings.medium,
    flexShrink: 1,
  },
  headerItem: {
    marginBottom: theme.margins.small,
  },
  headerLanguage: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: theme.paddings.small,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statsItem: {
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    padding: theme.paddings.large,
    borderRadius: 5,
    marginTop: theme.margins.large,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({
  id,
  ownerAvatarUrl: uri,
  fullName,
  description,
  language,
  forksCount,
  reviewCount,
  ratingAverage,
  stargazersCount,
  url,
  fullView,
}) => {
  const formatCount = (count) => {
    return count > 1000 ? (count / 1000).toFixed(1) + 'k' : count;
  };

  const _openGithub = () => {
    Linking.openURL(url);
  };

  return (
    <Link to={id}>
      <View testID="RepositoryItem" style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={{ uri }} />
          <View style={styles.headerTextContent}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={styles.headerItem}
            >
              {fullName}
            </Text>
            <Text color="textSecondary" style={styles.headerItem}>
              {description}
            </Text>
            <Text style={[styles.headerLanguage, styles.headerItem]}>
              {language}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View>
            <Text fontWeight="bold" style={styles.statsItem}>
              {formatCount(stargazersCount)}
            </Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View>
            <Text fontWeight="bold" style={styles.statsItem}>
              {formatCount(forksCount)}
            </Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View>
            <Text fontWeight="bold" style={styles.statsItem}>
              {formatCount(reviewCount)}
            </Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View>
            <Text fontWeight="bold" style={styles.statsItem}>
              {formatCount(ratingAverage)}
            </Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
        {fullView && (
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => _openGithub()}>
              <Text style={styles.buttonText}>View On GitHub</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Link>
  );
};

export default RepositoryItem;
