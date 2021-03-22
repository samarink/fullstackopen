import React from 'react';
import Constants from 'expo-constants';
import theme from './theme';
import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingTop: 40,
    padding: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Repositories" />
    </View>
  );
};

export default AppBar;
