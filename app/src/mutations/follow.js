import { gql } from "@apollo/client";

export const FOLLOW = gql`
mutation Follow($followingId: ID) {
    Follow(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;