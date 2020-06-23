import React, { Fragment } from "react"
import ReviewCard from "../../../UI/Cards/ReviewCard/ReviewCard"

function ProfileReview({ reviews }) {
  return (
    <Fragment>
      {reviews.map(review => (
        <ReviewCard review={review} key={review._id} />
      ))}
    </Fragment>
  )
}

export default ProfileReview
