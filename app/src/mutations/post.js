import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($content: String!, $postId: ID!) {
  CommentPost(content: $content, postId: $postId) {
    content
    username
    createdAt
    updatedAt
  }
}
`;

export const LIKE_POST = gql`
mutation LikePost($postId: ID!) {
  LikePost(postId: $postId) {
    username
    createdAt
    updatedAt
  }
}
`;

export const ADD_POST = gql`
  mutation AddPost($content: String!, $tags: [String], $imgUrl: String) {
  AddPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
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
  }
}
`;
