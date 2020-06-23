import React from "react"
import styles from "./BuzSingleReviews.module.scss"
import ReviewCard from "../../../../UI/Cards/ReviewCard/ReviewCard"

function BuzSingleReviews({ reviews }) {
  return (
   
      <div className={styles.mainBody}>
        <h2 className="sectionTitle">Reviews</h2>
        {reviews.map(rev => (
          <ReviewCard review={rev} key={rev._id} />
        ))}
      </div>
    
  )
}

export default BuzSingleReviews
