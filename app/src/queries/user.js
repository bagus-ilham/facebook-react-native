import { gql } from '@apollo/client';

export const FIND_USER_BY_ID = gql`
query GetUserById($id: ID!) {
  GetUserById(_id: $id) {
    _id
    name
    username
    email
    password
    userFollowing {
      email
      name
      username
    }
    userFollower {
      email
      name
      username
    }
  }
}
`;

export const FIND_USER_BY_USERNAME = gql`
query SearchUser($name: String) {
  SearchUser(name: $name) {
    _id
    name
    username
    email
    password
  }
}

`;
