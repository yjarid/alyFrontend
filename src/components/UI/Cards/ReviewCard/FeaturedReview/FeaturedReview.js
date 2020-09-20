import React, { useContext } from "react"
import { StateContext, DispatchContext } from "../../../../../Context"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_REVIEW, GET_REVIEWS } from "../../../../../qraphQl/reviewType"
import { useQuery } from "@apollo/react-hooks"
import FeaturedReviewTemplate from "./FeaturedReviewTemplate/FeaturedReviewTemplate"

function FeaturedReview() {
  // this par is only for admin rating of reviews
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [updateReview] = useMutation(UPDATE_REVIEW, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Review updated", type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })
  const { data: feateuredRev } = useQuery(GET_REVIEWS, {
    variables: { featured: "ONE", first: 4, appropriate: true },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

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
