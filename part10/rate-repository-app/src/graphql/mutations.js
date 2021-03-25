import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation auth($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;
