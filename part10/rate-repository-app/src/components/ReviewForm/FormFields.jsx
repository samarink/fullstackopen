import React from 'react';
import { View } from 'react-native';
import FormikTextInput from '../FormikTextInput';
import FormikButton from '../FormikButton';

const FormFields = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="number-pad"
      />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <FormikButton text="Create review" onSubmit={onSubmit} />
    </View>
  );
};

export default FormFields;
