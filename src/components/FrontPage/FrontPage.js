import React, { useEffect } from "react"
import FPHeader from "./FPHeader/FPHeader"
import BizList from "../Business/BizList/BizList"
import FeaturedReview from "../UI/Cards/ReviewCard/FeaturedReview/FeaturedReview"
import FeaturedImage from "../UI/Cards/ImageCard/FeaturedImage/FeaturedImage"
import styles from "./FrontPage.module.scss"

function FrontPage() {
  useEffect(() => {
    document.title = `Home | Aly`
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <FPHeader />
      <div className="container">
        <BizList />
        <div>
          <h1 className="sectionTitle">Reviews of the day</h1>
          <div className={styles.reviewGrid}>
            <FeaturedReview />
          </div>
        </div>
        <div>
          <h1 className="sectionTitle">Picture of the day</h1>
          <div className={styles.imageGrid}>
            <FeaturedImage />
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontPage
