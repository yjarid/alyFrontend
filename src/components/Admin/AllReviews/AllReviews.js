import React, { useState, Fragment } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_REVIEWS, UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import styles from "./AllReviews.module.scss"
import { useMutation } from "@apollo/react-hooks"
import FeaturedReviewTemplate from "../../UI/Cards/ReviewCard/FeaturedReview/FeaturedReviewTemplate/FeaturedReviewTemplate"

function AllReviews() {
  const [updateReview] = useMutation(UPDATE_REVIEW)
  const { data: datRev, error, loading } = useQuery(GET_REVIEWS, { variables: { limit: 20, published: false, appropriate: true } })

  let reviews = datRev ? datRev.reviews : []

  return (
    <div className={styles.container}>
      <div>
        <h1 className="sectionTitle">Check this week Reviews </h1>
        <div className={styles.reviewGrid}>
          {reviews.map(rev => (
            <FeaturedReviewTemplate rev={rev} isAdmin={true} updateReview={updateReview} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllReviews
