import gql from "graphql-tag"

export const CREATE_REVIEW = gql`
  mutation CreateReview($picture: [Upload], $text: String!, $rating: Int!, $business: ID!) {
    createReview(data: { picture: $picture, text: $text, rating: $rating, business: $business }) {
      _id
      business {
        nbrRev
        revPic
        totRev
        author {
          _id
        }
      }
    }
  }
`

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $claps: Int, $alyScore: Int, $alyCheck: Boolean, $appropriate: Boolean) {
    updateReview(id: $id, data: { claps: $claps, alyScore: $alyScore, alyCheck: $alyCheck, appropriate: $appropriate }) {
      _id
      alyScore
      alyCheck
      claps
      author {
        _id
      }
      business {
        _id
      }
      picture {
        _id
      }
    }
  }
`

export const GET_REVIEWS = gql`
  query Reviews($first: Int, $skip: Int, $orderBy: ReviewOrderByInput, $alyCheck: Boolean, $appropriate: Boolean) {
    reviews(first: $first, skip: $skip, orderBy: $orderBy, alyCheck: $alyCheck, appropriate: $appropriate) {
      _id
      text
      rating
      claps
      clappers
      alyScore
      alyCheck
      appropriate
      createdAt
      picture {
        _id
        picture
        desc
        claps
        alyScore
      }
      author {
        userName
        picture
        _id
        nbrRev
        revPic
        followers {
          _id
        }
      }
      business {
        _id
        name
        city
        neighborhood
        nbrRev
        revPic
        totRev
      }
    }
  }
`

export const GET_REVIEW = gql`
  query Review($id: ID!, $appropriate: Boolean) {
    review(id: $id, appropriate: $appropriate) {
      _id
      text
      rating
      claps
      clappers
      alyScore
      alyCheck
      appropriate
      createdAt
      picture {
        _id
        picture
        desc
        claps
        alyScore
      }
      author {
        userName
        picture
        _id
        nbrRev
        revPic
        followers {
          _id
        }
      }
      business {
        _id
        name
        city
        neighborhood
        nbrRev
        revPic
        totRev
      }
    }
  }
`

export const REVIEWS_BUSINESS = gql`
  query Reviews($busID: String, $first: Int, $skip: Int, $orderBy: ReviewOrderByInput) {
    reviews(busID: $busID, first: $first, skip: $skip, orderBy: $orderBy) {
      _id
      text
      rating
      createdAt
      claps
      appropriate
      businessFilter
      picture {
        _id
        picture
        desc
        claps
      }
      author {
        userName
        picture
        _id
        nbrRev
        revPic
        nbrFollowers
      }
    }
  }
`

export const REVIEWS_USER = gql`
  query reviews($appropriate: Boolean, $first: Int, $skip: Int, $orderBy: ReviewOrderByInput, $userID: String!) {
    reviews(appropriate: $appropriate, first: $first, skip: $skip, orderBy: $orderBy, userID: $userID) {
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
`
