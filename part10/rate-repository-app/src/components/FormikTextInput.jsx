import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  input: {
    margin: theme.margins.small,
    padding: theme.paddings.large,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.lightgray,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: theme.margins.small,
    padding: theme.paddings.small,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const style = [styles.input, showError && styles.errorInput];

  return (
    <>
      <TextInput
        style={style}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
