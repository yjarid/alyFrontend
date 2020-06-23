import gql from "graphql-tag"

export const CREATE_REVREPORT = gql`
  mutation CreateRevReport($id: ID!, $report: String!) {
    createRevReport(data: { id: $id, report: $report }) {
      _id
    }
  }
`

export const GET_REVREPORTS = gql`
  query RevReports {
    revReports {
      _id
      createdAt
      report
      decision
      from {
        _id
        userName
        email
      }
      review {
        _id
        text
        business {
          _id
        }
      }
    }
  }
`

export const UPDATE_REVREPORT = gql`
  mutation UpdateRevReport($id: ID!, $decision: String) {
    updateRevReport(id: $id, data: { decision: $decision }) {
      _id
    }
  }
`
