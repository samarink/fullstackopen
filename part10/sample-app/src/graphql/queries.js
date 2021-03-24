import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
 {
   repositories {
     edges {
       node {
         ...RepositoryDetails
       }
     }
   }
 }
 ${REPOSITORY_DETAILS}
`
