import React from 'react';
import Constants from 'expo-constants';
import theme from './theme';
import { ScrollView, View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingTop: 40,
    padding: 20,
  },
  scrollview: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollview}>
        <AppBarTab title="Repositories" to="/" />
        <AppBarTab title="Sign In" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
