import gql from "graphql-tag"

export const REGISTER = gql`
  mutation CreateUser($userName: String!, $email: String!, $password: String!, $recaptcha: String!) {
    createUser(data: { userName: $userName, email: $email, password: $password, recaptcha: $recaptcha }) {
      userName
    }
  }
`

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      userName
      description
      city
      picture
    }
  }
`
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        _id
        type
      }
    }
  }
`

export const CHANGE_PASS = gql`
  mutation ChangePass($id: ID!, $password: String!, $token: String!) {
    changePass(id: $id, data: { password: $password, token: $token }) {
      _id
      userName
      email
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $picture: Upload, $userName: String, $description: String, $city: String) {
    updateUser(id: $id, data: { picture: $picture, userName: $userName, description: $description, city: $city }) {
      userName
      picture
      description
      city
    }
  }
`

// Profile Info Section
export const PROFILE_INFO = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      userName
      picture
      description
      city
      nbrRev
      revPic
      nbrFollowers
    }
  }
`

export const PROFILE_INFO_FEED = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      followings {
        user {
          _id
          userName
          picture
          performerFeeds(first: 10, orderBy: createdAt_DESC) {
            _id
            action
            createdAt
            recipient {
              _id
              userName
            }
            business {
              _id
              name
            }
            review {
              _id
            }
            image {
              _id
              picture
              claps
              desc
              createdAt
            }
          }
        }
      }
      recipientFeeds(first: 10, orderBy: createdAt_DESC) {
        _id
        action
        createdAt
        performer {
          _id
          userName
          picture
        }
        business {
          _id
          name
        }
        review {
          _id
        }
        image {
          _id
          picture
          claps
          desc
          createdAt
        }
      }
    }
  }
`
export const PROFILE_INFO_OWNEDBUSINESS = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      ownedBus {
        _id
        name
        desc
        picture
        neighborhood
        city
        cat
        subCat
        nbrRev
        totRev
        revPic
      }
    }
  }
`

// determine whether the logged in user is following the user of the rpofile page
export const IS_FOLLOWING = gql`
  query User($id: ID!) {
    isFollowing(id: $id)
  }
`

export const ME = gql`
  query Me {
    me {
      _id
      userName
      type
      followings {
        user {
          _id
        }
      }
    }
  }
`
