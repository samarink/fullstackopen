import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import FormikButton from './FormikButton';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'username should be at least 4 characters long')
    .required('username is required'),
  password: yup
    .string()
    .min(8, 'password should be at least 8 characters long')
    .required('password is required'),
});

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
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      history.push('/');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
