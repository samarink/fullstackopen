import { gql } from '@apollo/client';
import { REVIEW_DETAILS } from './fragments';

export const AUTHORIZE = gql`
  mutation auth($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      ...ReviewDetails
    }
  }
  ${REVIEW_DETAILS}
`;
