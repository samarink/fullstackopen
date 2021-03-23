import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text style={styles.text}>{title}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
