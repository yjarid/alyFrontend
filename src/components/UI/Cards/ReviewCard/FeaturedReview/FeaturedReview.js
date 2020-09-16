import React, { useContext } from "react"
import { StateContext } from "../../../../../Context"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_REVIEW, GET_REVIEWS } from "../../../../../qraphQl/reviewType"
import { useQuery } from "@apollo/react-hooks"
import FeaturedReviewTemplate from "./FeaturedReviewTemplate/FeaturedReviewTemplate"

function FeaturedReview() {
  // this par is only for admin rating of reviews
  const appState = useContext(StateContext)

  const [updateReview, { data, error, loading }] = useMutation(UPDATE_REVIEW)
  const { data: feateuredRev } = useQuery(GET_REVIEWS, { variables: { featured: "ONE", first: 4, appropriate: true } })

  let reviews = feateuredRev ? feateuredRev.reviews : []

  return (
    <>
      {reviews.map(rev => (
        <FeaturedReviewTemplate rev={rev} isAdmin={appState.user.type == "ADMIN"} updateReview={updateReview} />
      ))}
    </>
  )
}

export default FeaturedReview
