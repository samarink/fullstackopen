import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Pressable style={styles.container}>
      <Link to={to}>
        <Text style={styles.text}>{title}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
