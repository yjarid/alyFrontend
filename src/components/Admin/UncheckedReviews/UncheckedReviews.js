import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_REVIEWS, UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import styles from "./UncheckedReviews.module.scss"
import { useMutation } from "@apollo/react-hooks"
import FeaturedReviewTemplate from "../../UI/Cards/ReviewCard/FeaturedReview/FeaturedReviewTemplate/FeaturedReviewTemplate"

function UncheckedReviews() {
  const [updateReview] = useMutation(UPDATE_REVIEW)
  const { data } = useQuery(GET_REVIEWS, { variables: { first: 20, alyCheck: false, appropriate: true } })

  let reviews = data ? data.reviews : []

  console.log(reviews)

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
