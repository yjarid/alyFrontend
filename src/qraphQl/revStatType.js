import gql from "graphql-tag"

export const CREATE_REPORT = gql`
  mutation CreateReport($id: ID!, $report: String!, $type: String!) {
    createReport(data: { id: $id, report: $report, type: $type }) {
      _id
    }
  }
`

export const GET_REPORTS = gql`
  query Reports {
    Reports {
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
