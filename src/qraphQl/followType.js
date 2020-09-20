import gql from "graphql-tag"

export const GET_FOLLOWERS = gql`
  query Followers($userId: ID!) {
    followers(userId: $userId) {
      follower {
        _id
        userName
        picture
        nbrRev
        revPic
        description
        city
      }
    }
  }
`

export const CREATE_FOLLOW = gql`
  mutation CreateFollow($user: String!) {
    createFollow(data: { user: $user }) {
      _id
    }
  }
`

export const DELETE_FOLLOW = gql`
  mutation DeleteFollow($user: String!) {
    deleteFollow(data: { user: $user }) {
      _id
    }
  }
`

// Profile Info Section
export const FOLLOWERS_USER = gql`
  query Followers($userID: String) {
    followers(first: 40, userID: $userID) {
      follower {
        _id
        userName
        picture
        nbrRev
        revPic
        description
        city
      }
    }
  }
`
