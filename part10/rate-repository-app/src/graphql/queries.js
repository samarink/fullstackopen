import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS, PAGE_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $after: String
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        ...PageDetails
      }
    }
  }
  ${PAGE_DETAILS}
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY_WITH_ID = gql`
  query repository($after: String, $first: Int, $id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews(after: $after, first: $first) {
        totalCount
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageDetails
        }
      }
    }
  }
  ${PAGE_DETAILS}
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  {
    authorizedUser {
      id
      username
    }
  }
`;
