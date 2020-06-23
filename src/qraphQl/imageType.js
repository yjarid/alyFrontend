import gql from "graphql-tag"

export const UPDATE_IMAGE_CLAPS = gql`
  mutation UpdateImage($id: ID!, $picture: String, $desc: String, $claps: Int) {
    updateImage(id: $id, data: { picture: $picture, desc: $desc, claps: $claps }) {
      _id
      claps
      review {
        _id
        author {
          _id
        }
        business {
          _id
        }
      }
    }
  }
`

export const UPDATE_IMAGE_DESC = gql`
  mutation UpdateImage($id: ID!, $picture: String, $desc: String, $claps: Int) {
    updateImage(id: $id, data: { picture: $picture, desc: $desc, claps: $claps }) {
      desc
    }
  }
`

export const GET_FEATURED_IMAGES = gql`
  query Images($featured: Boolean, $limit: Int) {
    images(featured: $featured, limit: $limit) {
      _id
      picture
      desc
      claps
      review {
        createdAt
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
          neighborhood
        }
      }
    }
  }
`

export const GET_TOP_FEATURED_IMAGES = gql`
  query Images($limit: Int, $topFeatured: Boolean) {
    images(topFeatured: $topFeatured, limit: $limit) {
      _id
      picture
      desc
      claps
      review {
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
  }
`
