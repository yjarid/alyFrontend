import React, { useState, Fragment } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_REVIEWS } from "../../../qraphQl/reviewType"
import styles from "./AllReviews.module.scss"
import FeaturedReview from "../../UI/Cards/ReviewCard/FeaturedReview/FeaturedReview"

function Business(props) {
  const [index, setIndex] = useState(0)
  const { data: datRev, error, loading } = useQuery(GET_REVIEWS, { variables: { limit: 20 } })

  let reviews = datRev ? datRev.reviews : []

  const setBusIndex = i => {
    setIndex(i)
  }

  console.log(datRev)

  return (
    <div className={styles.container}>
      <div>
        <h1 className="sectionTitle">Check this week Reviews </h1>
        <div className={styles.reviewGrid}>
          <FeaturedReview reviews={reviews} />
        </div>
      </div>
    </div>
  )
}

export default Business
