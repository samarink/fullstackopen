import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import FormikButton from './FormikButton';

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikButton text="Sign In" onSubmit={onSubmit} />
    </View>
  );
};

const SignIn = () => {
  const onSubmit = ({ username, password }) => console.log(username, password);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
