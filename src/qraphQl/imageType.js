import gql from "graphql-tag"

export const GET_IMAGES = gql`
  query Images($first: Int, $skip: Int, $orderBy: ImageOrderByInput) {
    images(first: $first, skip: $skip, orderBy: $orderBy) {
      _id
      picture
      desc
      claps
      createdAt
      author {
        userName
        picture
        _id
        nbrRev
        revPic
        nbrFollowers
      }
      business {
        _id
        name
        neighborhood
      }
    }
  }
`

export const GET_TOP_FEATURED_IMAGES = gql`
  query Images($first: Int, $skip: Int, $orderBy: ImageOrderByInput) {
    images(first: $first, skip: $skip, orderBy: $orderBy) {
      _id
      picture
      author {
        userName
        _id
      }
      business {
        name
        _id
      }
    }
  }
`

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: ID!, $picture: String, $desc: String, $claps: Int, $alyScore: Int, $appropriate: Boolean) {
    updateImage(id: $id, data: { picture: $picture, desc: $desc, claps: $claps, alyScore: $alyScore, appropriate: $appropriate }) {
      _id
      claps
      desc
      alyScore
      author {
        _id
      }
      business {
        _id
      }
      review {
        _id
      }
    }
  }
`

export const IMAGES_BUSINESS = gql`
  query Images($appropriate: Boolean, $first: Int, $skip: Int, $orderBy: ImageOrderByInput, $busID: String) {
    images(appropriate: $appropriate, first: $first, skip: $skip, orderBy: $orderBy, busID: $busID) {
      _id
      picture
      desc
      claps
      createdAt
      author {
        _id
        userName
        picture
        nbrRev
        revPic
        nbrFollowers
      }
    }
  }
`

export const IMAGES_USER = gql`
  query Images($appropriate: Boolean, $first: Int, $skip: Int, $orderBy: ImageOrderByInput, $userID: String) {
    images(appropriate: $appropriate, first: $first, skip: $skip, orderBy: $orderBy, userID: $userID) {
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
`
