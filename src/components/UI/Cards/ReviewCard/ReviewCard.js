import React, { useState, Fragment } from "react"
import { Link } from "react-router-dom"
import Modal from "../../Modal/Modal"
import styles from "./ReviewCard.module.scss"
import ImageGrid from "../../../UI/ImageGrid/ImageGrid"
import Clap from "../../Clap/Clap"
import { StyledRating } from "../../../UI/CustomFields/StyledRating"
import dayjs from "dayjs"
import { useMediaQuery } from "react-responsive"
import { upCaseFirstLetter } from "../../../../utils/string"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineShop } from "react-icons/ai"
import imageFromReviews from "../../../../utils/imageFromReviews"
import ReportForm from "../../ReportForm/ReportForm"

function ReviewCard({ review }) {
  const [showModal, setShowModal] = useState(false)
  const isTablet = useMediaQuery({
    query: "(min-device-width: 768px)"
  })

  let modalInfo = imageFromReviews(review)

  let data = null
  let url = null
  let isUser = false
  let type = "business" // used to define the link in the modal image

  if (typeof review.business != "undefined") {
    data = review.business
    url = `/business/${data._id}`
  } else if (typeof review.author != "undefined") {
    data = review.author
    data.name = data.userName
    url = `/profile/${data._id}`
    type = "profile"
    isUser = true
  }

  const dt = dayjs(review.createdAt)

  const modalClosed = () => {
    setShowModal(false)
  }

  return (
    <Fragment>
      <Modal show={showModal} modalClosed={modalClosed}>
        <ReportForm id={review._id} type={"REV"} />
      </Modal>

      <div className={styles.revContainer} id={review._id} key={review._id}>
        <div className={styles.revContainerInner}>
          <div className={styles.revContainerAvatar}>{data.picture ? <img src={data.picture} alt="" /> : isUser ? <FaUserCircle size="90%" color="#0996e8" /> : <AiOutlineShop size="90%" color="#0996e8" />}</div>
          <div>
            <div className={styles.revAuth}>
              <Link to={url}>{upCaseFirstLetter(data.name)}</Link>
            </div>
            <div className={styles.revChips}>
              <div className="chipsContainer">
                {isUser && (
                  <div className="chip">
                    <BsFillPeopleFill color="#0996e8" />
                    <div className="label">{`${data.followers.length} ${isTablet ? "Followers" : ""}`}</div>
                  </div>
                )}
                <div className="chip">
                  <BsStarFill color="#0996e8" />
                  <div className="label">{`${data.nbrRev} ${isTablet ? "Reviews" : ""}`} </div>
                </div>
                <div className="chip">
                  <AiFillCamera color="#0996e8" />
                  <div className="label">{`${data.revPic} ${isTablet ? "Photos" : ""}`}</div>
                </div>
              </div>
            </div>
            <div className={styles.location}>
              <Link to={`/business/location/casablanca`}>Casablanca</Link>
            </div>
            <div className={styles.revRating}>
              <StyledRating value={review.rating} size={!isTablet ? "small" : "medium"} readOnly />
              <div className={styles.date}>{dt.format("DD-MM-YYYY")}</div>
            </div>
          </div>
        </div>

        <p className={styles.revDesc}>{review.text}</p>

        <div className={styles.revPicture}>
          <ImageGrid images={modalInfo} type={type} />
        </div>

        <div className={styles.clap}>
          <Clap claps={review.claps || 0} id={review._id} type="review" />
        </div>

        <p className={styles.report}>
          if review is inappropriate please
          <span className={styles.reportbtn} onClick={() => setShowModal(true)}>
            report it
          </span>
        </p>
      </div>
    </Fragment>
  )
}

export default ReviewCard
