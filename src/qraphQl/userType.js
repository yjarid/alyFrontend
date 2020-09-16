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
// Profile Info Section
export const PROFILE_INFO_WITH_FOLLOWERS = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      userName
      picture
      description
      city
      nbrRev
      revPic
      followers {
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

export const PROFILE_INFO_REVIEWS = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      reviews {
        _id
        text
        rating
        createdAt
        claps
        clappers
        picture {
          _id
          picture
          desc
          claps
        }

        business {
          _id
          name
          picture
          nbrRev
          totRev
          revPic
        }
      }
    }
  }
`

export const PROFILE_INFO_IMAGES = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      revPictures {
        _id
        picture
        desc
        claps
        alyScore
        business {
          _id
          name
          picture
          nbrRev
          totRev
          revPic
        }
      }
    }
  }
`
