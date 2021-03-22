import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    borderRadius: 5,
    width: 66,
    height: 58,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerTextContent: {
    paddingLeft: 10,
    flexShrink: 1,
  },
  headerItem: {
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  headerDescription: {
    color: theme.colors.textSecondary,
  },
  headerLanguage: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  statsHeader: {
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  statsDescription: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

const RepositoryItem = ({
  ownerAvatarUrl: uri,
  fullName,
  description,
  language,
  forksCount,
  reviewCount,
  ratingAverage,
  stargazersCount,
}) => {
  const formatCount = (count) => {
    return count > 1000 ? (count / 1000).toFixed(1) + 'k' : count;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={{ uri }} />
        <View style={styles.headerTextContent}>
          <Text style={[styles.headerTitle, styles.headerItem]}>
            {fullName}
          </Text>
          <Text style={[styles.headerDescription, styles.headerItem]}>
            {description}
          </Text>
          <Text style={[styles.headerLanguage, styles.headerItem]}>
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View>
          <Text style={styles.statsHeader}>{formatCount(stargazersCount)}</Text>
          <Text style={styles.statsDescription}>Stars</Text>
        </View>
        <View>
          <Text style={styles.statsHeader}>{formatCount(forksCount)}</Text>
          <Text style={styles.statsDescription}>Forks</Text>
        </View>
        <View>
          <Text style={styles.statsHeader}>{formatCount(reviewCount)}</Text>
          <Text style={styles.statsDescription}>Reviews</Text>
        </View>
        <View>
          <Text style={styles.statsHeader}>{formatCount(ratingAverage)}</Text>
          <Text style={styles.statsDescription}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
