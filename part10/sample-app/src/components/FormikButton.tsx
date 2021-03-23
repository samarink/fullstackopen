import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    margin: theme.margins.small,
    padding: theme.paddings.large,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.lightgray,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center'
  },
});

const FormikButton = ({ text, onSubmit, ...props }) => {
  return (
    <Pressable style={styles.container} onPress={onSubmit} {...props}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default FormikButton;
