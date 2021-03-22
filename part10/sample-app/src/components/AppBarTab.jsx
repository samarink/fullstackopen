import React from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
