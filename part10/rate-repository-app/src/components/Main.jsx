import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppBar from './AppBar';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/review" exact>
          <ReviewForm />
        </Route>
        <Route path="/myreviews" exact>
          <MyReviews />
        </Route>
        <Route path="/repository/:id">
          <RepositoryView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
