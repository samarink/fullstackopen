import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
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
  const [user, setUser] = useState(null);
  const result = useQuery(GET_AUTHORIZED_USER);
  const signOut = useSignOut();

  useEffect(() => {
    if (result.data) setUser(result.data.authorizedUser);
  }, [result]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollview}>
        <AppBarTab title="Repositories" to="/" />
        {user ? (
          <AppBarTab title="Sign Out" onPress={() => signOut()} />
        ) : (
          <AppBarTab title="Sign In" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
