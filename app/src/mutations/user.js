import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($password: String!, $username: String) {
    Login(password: $password, username: $username) {
      accessToken
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    Register(name: $name, username: $username, email: $email, password: $password) {
      email
      name
      password
      username
    }
  }
`;
