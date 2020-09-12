import React, { useEffect } from "react"
import FPHeader from "./FPHeader/FPHeader"
import BizList from "../Business/BizList/BizList"
import FeaturedReview from "../UI/Cards/ReviewCard/FeaturedReview/FeaturedReview"
import FeaturedImage from "../UI/Cards/ImageCard/FeaturedImage/FeaturedImage"
import styles from "./FrontPage.module.scss"
import beautyImg from "../../static/image/beauty.jpg"
import schoolImg from "../../static/image/school.jpg"
import restImg from "../../static/image/rest.jpg"
import doctorImg from "../../static/image/doctor.jpg"
import { Link } from "react-router-dom"

const CATEGORY = [
  { name: "Beauty & Wellness", image: beautyImg, url: "beauty and wellness" },
  { name: "Education", image: schoolImg, url: "education" },
  { name: "Restaurants", image: restImg, url: "restaurant" },
  { name: "Health", image: doctorImg, url: "doctor" }
]

function FrontPage() {
  useEffect(() => {
    document.title = `Home | Aly`
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <FPHeader />
      <div className="container">
        <div>
          <h1 className="sectionTitle">Find Best Businesses in Casablanca</h1>
          <div className={styles.mainCategory}>
            {CATEGORY.map((cat, i) => (
              <div className={styles.categoryItem} key={i}>
                <Link to={`/map?cityParam=casablanca&categoryParam=${cat.url}`}>
                  <div>
                    <img src={cat.image} alt="" />
                  </div>
                  <div className={styles.categoryItemName}>{cat.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
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
