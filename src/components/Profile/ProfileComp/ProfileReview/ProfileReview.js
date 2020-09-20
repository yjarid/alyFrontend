import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import ReviewCard from "../../../UI/Cards/ReviewCard/ReviewCard"
import { REVIEWS_USER } from "../../../../qraphQl/reviewType"
import { useQuery } from "@apollo/react-hooks"

function ProfileReview() {
  const { id } = useParams()
  const { data, error, loading } = useQuery(REVIEWS_USER, { variables: { userID: id, appropriate: true, first: 10, orderBy: "score_DESC" } })

  let reviews = data ? data.reviews : []
  return (
    <Fragment>
      {reviews.map(review => (
        <ReviewCard review={review} key={review._id} />
      ))}
    </Fragment>
  )
}

export default ProfileReview
