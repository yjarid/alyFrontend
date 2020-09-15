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
    reports(orderBy: createdAt_DESC) {
      _id
      createdAt
      report
      decision
      type
      from {
        _id
        userName
        email
      }
      review {
        _id
        text
      }
      business {
        _id
        name
      }
    }
  }
`

export const UPDATE_REPORT = gql`
  mutation UpdateReport($id: ID!, $decision: String) {
    updateReport(id: $id, data: { decision: $decision }) {
      _id
    }
  }
`
