import { gql } from '@apollo/client';

export const GET_POSTS_QUERY = gql`
  query GetPost {
  GetPost {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    authorDetail {
      email
      name
      username
      _id
    }
  }
}
`;

export const GET_POSTS_BY_ID_QUERY = gql`
  query GetPostById($id: ID!) {
  GetPostId(_id: $id) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      createdAt
      updatedAt
      username
    }
    likes {
      createdAt
      updatedAt
      username
    }
    createdAt
    updatedAt
    authorDetail {
      email
      name
      username
    }
  }
}
`;
