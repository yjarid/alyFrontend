import React, { useContext, useEffect } from "react"
import { StateContext, DispatchContext } from "../../../../../Context"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_REVIEW, GET_REVIEWS } from "../../../../../qraphQl/reviewType"
import { useLazyQuery } from "@apollo/react-hooks"
import FeaturedReviewTemplate from "./FeaturedReviewTemplate/FeaturedReviewTemplate"
import useDefinePage from "../../../../../useFuction/useDefinePage"

function FeaturedReview() {
  // this par is only for admin rating of reviews
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const PER_PAGE = 4

  let page = useDefinePage()

  const [getReviews, { data }] = useLazyQuery(GET_REVIEWS, {
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })
  useEffect(() => {
    if (page >= 0) {
      getReviews({ variables: { first: PER_PAGE, skip: PER_PAGE * page, orderBy: "score_DESC", appropriate: true } })
    }
  }, [page])

  let reviews = data ? data.reviews : []

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

  return (
    <>
      {reviews.map(rev => (
        <FeaturedReviewTemplate rev={rev} isAdmin={appState.user.type == "ADMIN"} updateReview={updateReview} />
      ))}
    </>
  )
}

export default FeaturedReview
