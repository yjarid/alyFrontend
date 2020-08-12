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
  query Reviews($featured: Featured, $limit: Int, $published: Boolean) {
    reviews(featured: $featured, limit: $limit, published: $published) {
      _id
      text
      rating
      claps
      clappers
      alyScore
      published
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
  mutation UpdateReview($id: ID!, $claps: Int, $alyScore: Int, $published: Boolean) {
    updateReview(id: $id, data: { claps: $claps, alyScore: $alyScore, published: $published }) {
      _id
      alyScore
      published
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
