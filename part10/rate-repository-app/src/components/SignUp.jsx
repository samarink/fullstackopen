import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import FormikButton from './FormikButton';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'username should be at least 1 characters long')
    .max(30, 'username should be at max 30 characters long')
    .required('username is required'),
  password: yup
    .string()
    .min(5, 'password should be at least 5 characters long')
    .max(50, 'password should be at max 50 characters long')
    .required('password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Confirm Password"
        secureTextEntry
      />
      <FormikButton text="Sign Up" onSubmit={onSubmit} />
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      console.log(data);

      await signIn({ username, password });
      history.push('/');
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
