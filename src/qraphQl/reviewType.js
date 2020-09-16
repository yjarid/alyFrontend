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
export const GET_REVIEWS = gql`
  query Reviews($featured: Featured, $first: Int, $alyCheck: Boolean, $appropriate: Boolean) {
    reviews(featured: $featured, first: $first, alyCheck: $alyCheck, appropriate: $appropriate) {
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
  query Review($id: ID!) {
    review(id: $id) {
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
    }
  }
`
