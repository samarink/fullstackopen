import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import useUser from '../hooks/useUser';
import useSignOut from '../hooks/useSignOut';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingTop: 40,
    padding: 20,
  },
  scrollview: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { user } = useUser();
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollview}>
        <AppBarTab title="Repositories" to="/" />
        {user ? (
          <>
            <AppBarTab title="Create a Review" to="/review" />
            <AppBarTab title="Sign Out" onPress={() => signOut()} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign In" to="/signin" />
            <AppBarTab title="Sign Up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
