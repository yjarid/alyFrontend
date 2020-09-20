import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_REVIEWS, UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import styles from "./UncheckedReviews.module.scss"
import { useMutation } from "@apollo/react-hooks"
import FeaturedReviewTemplate from "../../UI/Cards/ReviewCard/FeaturedReview/FeaturedReviewTemplate/FeaturedReviewTemplate"
import { DispatchContext } from "../../../Context"

function UncheckedReviews() {
  const appDispatch = useContext(DispatchContext)

  const [updateReview] = useMutation(UPDATE_REVIEW, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `Review updated`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  const { data } = useQuery(GET_REVIEWS, {
    variables: { first: 20, alyCheck: false, appropriate: true },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  let reviews = data ? data.reviews : []

  return (
    <div className={styles.container}>
      <div>
        <h1 className="sectionTitle">Check this week Reviews </h1>
        <div className={styles.reviewGrid}>
          {reviews.map(rev => (
            <FeaturedReviewTemplate key={rev._id} rev={rev} isAdmin={true} updateReview={updateReview} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UncheckedReviews
