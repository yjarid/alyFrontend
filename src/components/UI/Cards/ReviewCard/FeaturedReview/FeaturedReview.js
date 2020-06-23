import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_REVIEWS } from "../../../../../qraphQl/reviewType"
import { upCaseFirstLetter } from "../../../../../utils/string"
import Clap from "../../../Clap/Clap"
import styles from "./FeaturedReview.module.scss"
import { Link } from "react-router-dom"
import { StyledRating } from "../../../../UI/CustomFields/StyledRating"
import ImageGrid from "../../../../UI/ImageGrid/ImageGrid"
import imageFromReviews from "../../../../../utils/imageFromReviews"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"

function FeaturedReview() {
  const { data, error, loading } = useQuery(GET_REVIEWS, { variables: { featured: true, limit: 4 } })

  let reviews = data ? data.reviews : []

  return (
    <>
      {reviews.map(rev => {
        let modalInfo = imageFromReviews(rev)
        return (
          <div className={styles.revContainer} id={rev._id} key={rev._id}>
            <div className={styles.revContainerInner}>
              <div className={styles.revContainerAvatar}>{rev.author.picture ? <img src={rev.author.picture.replace("t_meduim", "t_small")} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>

              <div>
                <div className={styles.revAuth}>
                  <Link to={`/profile/${rev.author._id}`}>{upCaseFirstLetter(rev.author.userName)}</Link>
                </div>

                <div className="chipsContainer">
                  <div className="chip">
                    <BsFillPeopleFill color="#0996e8" />
                    <div className="label">{rev.author.followers.length}</div>
                  </div>
                  <div className="chip">
                    <BsStarFill color="#0996e8" />
                    <div className="label">{rev.author.nbrRev} </div>
                  </div>
                  <div className="chip">
                    <AiFillCamera color="#0996e8" />
                    <div className="label">{rev.author.revPic}</div>
                  </div>
                </div>

                <div className={styles.busSection}>
                  <div className={styles.busName}>
                    <span>for: </span>
                    <Link to={`/business/${rev.business._id}`}>{upCaseFirstLetter(rev.business.name)}</Link>
                  </div>
                  <div className={styles.location}>
                    <Link to={`/tax/location/${rev.business.city}/${rev.business.neighborhood}`}>{rev.business.neighborhood}</Link>
                  </div>
                </div>

                <div className={styles.revRating}>
                  <StyledRating value={rev.rating} size="small" readOnly />
                </div>
              </div>
            </div>
            <p className={styles.revDesc}>{rev.text}</p>
            <div className={styles.revPicture}>
              <ImageGrid images={modalInfo} size="small" />
            </div>

            <Clap claps={rev.claps || 0} id={rev._id} type="review" />
          </div>
        )
      })}
    </>
  )
}

export default FeaturedReview
