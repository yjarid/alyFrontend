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
  query Reviews($featured: Boolean, $limit: Int) {
    reviews(featured: $featured, limit: $limit) {
      _id
      text
      rating
      claps
      clappers
      createdAt
      picture {
        _id
        picture
        desc
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
  mutation UpdateReview($id: ID!, $claps: Int) {
    updateReview(id: $id, data: { claps: $claps }) {
      _id
      author {
        _id
      }
      business {
        _id
        name
      }
      claps
    }
  }
`
