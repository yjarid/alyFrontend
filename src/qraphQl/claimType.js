import gql from "graphql-tag"

export const GET_CLAIMS = gql`
  query Claims($status: String) {
    claims(status: $status) {
      _id
      status
      createdAt
      user {
        _id
        userName
        email
      }
      business {
        _id
        name
      }
    }
  }
`

export const UPDATE_CLAIM = gql`
  mutation UpdateClaim($id: ID!, $status: String, $user: String, $business: String) {
    updateClaim(id: $id, data: { status: $status, user: $user, business: $business }) {
      _id
      status
    }
  }
`
