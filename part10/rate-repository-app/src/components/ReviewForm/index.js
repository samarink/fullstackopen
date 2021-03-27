import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import FormFields from './FormFields';
import useCreateReview from '../../hooks/useCreateReview';
import * as yup from 'yup';

const initialValues = {
  ownerName: 'zeit',
  repositoryName: 'next.js',
  rating: '90',
  text: 'reviewtext',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('owner username is required'),
  repositoryName: yup.string().required('repository name is required'),
  rating: yup
    .number()
    .min(0, 'rating must be at least 0')
    .max(100, 'rating must be at max 100')
    .integer('rating must be an integer')
    .required('rating is required'),
  text: yup.string(),
});

const ReviewForm = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });

      const repositoryId = data.createReview;
      history.push(`/repository/${repositoryId}`);
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
      {({ handleSubmit }) => <FormFields onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;
