import gql from "graphql-tag"

export const GET_BUSINESS = gql`
  query Business($id: ID!, $onlyOwner: Boolean, $preview: Boolean, $published: Boolean) {
    business(id: $id, onlyOwner: $onlyOwner, preview: $preview, published: $published) {
      name
      desc
      excerpt
      address
      city
      neighborhood
      cat
      subCat
      picture
      nbrRev
      totRev
      revPic
      published
      location {
        coordinates
      }
      phone
      price
    }
  }
`

export const GET_BUSINESS_WITH_REVIEWS = gql`
  query Business($id: ID!, $onlyOwner: Boolean, $published: Boolean) {
    business(id: $id, onlyOwner: $onlyOwner, published: $published) {
      _id
      name
      desc
      excerpt
      address
      phone
      city
      neighborhood
      cat
      subCat
      picture
      nbrRev
      totRev
      revPic
      published
      price
      owner {
        _id
      }
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
      }
    }
  }
`

export const GET_BUSINESSES = gql`
  query Businesses($published: Boolean, $query: String, $limit: Int, $type: String, $cat: String, $subCat: [String], $city: String, $neighborhood: String, $price: String, $bound: [Float], $authorId: ID, $orderBy: ORDERBY) {
    businesses(published: $published, limit: $limit, query: $query, type: $type, cat: $cat, subCat: $subCat, city: $city, neighborhood: $neighborhood, price: $price, bound: $bound, authorId: $authorId, orderBy: $orderBy) {
      _id
      name
      excerpt
      address
      city
      neighborhood
      score
      location {
        coordinates
      }
      cat
      subCat
      picture
      nbrRev
      totRev
      revPic
      price
      phone
      published
    }
  }
`

export const UPDATE_BUSINESS = gql`
  mutation UpdateBusiness($id: ID!, $picture: Upload, $name: String, $desc: String, $excerpt: String, $address: String, $city: String, $neighborhood: String, $cat: String, $subCat: [String!], $published: Boolean, $latitude: String, $longitude: String, $price: String, $phone: String) {
    updateBusiness(id: $id, data: { picture: $picture, name: $name, desc: $desc, excerpt: $excerpt, address: $address, city: $city, neighborhood: $neighborhood, cat: $cat, subCat: $subCat, published: $published, latitude: $latitude, longitude: $longitude, price: $price, phone: $phone }) {
      name
      excerpt
      address
      city
      neighborhood
      location {
        coordinates
      }
      cat
      subCat
      picture
      nbrRev
      totRev
      revPic
      price
      phone
    }
  }
`

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($picture: Upload, $name: String!, $desc: String, $excerpt: String, $address: String, $city: String!, $neighborhood: String!, $cat: String!, $subCat: [String!], $latitude: String, $longitude: String, $price: String, $phone: String) {
    createBusiness(data: { picture: $picture, name: $name, desc: $desc, excerpt: $excerpt, address: $address, city: $city, neighborhood: $neighborhood, cat: $cat, subCat: $subCat, latitude: $latitude, longitude: $longitude, price: $price, phone: $phone }) {
      _id
      name
    }
  }
`

export const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($id: ID!) {
    deleteBusiness(id: $id) {
      _id
      name
    }
  }
`
