import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { HashLink as Link2 } from "react-router-hash-link"
import { feedConcat } from "../../../../utils/feedConcat"
import { timeAgo } from "../../../../utils/timeAgo"
import { upCaseFirstLetter } from "../../../../utils/string"
import { PROFILE_FEED } from "../../../../qraphQl/userType"
import { useQuery } from "@apollo/react-hooks"
import styles from "./ProfileFeed.module.scss"
import ImageModal from "../../../UI/ImageModal/ImageModal"
import { FaUserCircle } from "react-icons/fa"
import imageFromFeed from "../../../../utils/imageFromFeed"
import ReviewCard from "../../../UI/Cards/ReviewCard/ReviewCard"

function ProfileFeed() {
  const { id } = useParams()
  const { loading, data, error } = useQuery(PROFILE_FEED, { variables: { id } })
  let feeds = null
  const [imageInfo, setImageInfo] = useState([])
  const [showImageModal, setShowImageModal] = useState(false)
  const [reviewInfo, setReviewInfo] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [index, setIndex] = useState(0)

  if (data) {
    console.log(data.user)
    feeds = feedConcat(data.user)
  }

  const display = feed => {
    let el = null
    switch (feed.action) {
      case "ADD_BUS":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performerPic ? <img src={feed.performerPic} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>

            <div className={styles.section}>
              <Link to={`/profile/${feed.performerID}`}>{upCaseFirstLetter(feed.performerName)}</Link> added a new business : <Link to={`/business/${feed.business._id}`}>{upCaseFirstLetter(feed.business.name)}</Link>
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break
      case "FOLLOW":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performerPic ? <img src={feed.performerPic} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> started following {feed.recipientID ? <Link to={`/profile/${feed.recipientID}`}>{upCaseFirstLetter(feed.recipientName)}</Link> : "You"}
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break
      case "ADD_REVIEW":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performerPic ? <img src={feed.performerPic} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> added a{" "}
              <span className={styles.image} onClick={() => openReviewModal(feed)}>
                review
              </span>{" "}
              to <Link to={`/business/${feed.business._id}`}>{upCaseFirstLetter(feed.business.name)}</Link>
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break
      case "CLAP_REVIEW":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performerPic ? <img src={feed.performerPic} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> clapped to {feed.type == "ur" ? "your" : "a"}{" "}
              <span className={styles.image} onClick={() => openReviewModal(feed)}>
                review
              </span>{" "}
              for <Link to={`/business/${feed.business._id}`}>{upCaseFirstLetter(feed.business.name)}</Link>
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break

      case "CLAP_IMAGE":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performer.picture ? <img src={feed.performer.picture} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> clapped to an{" "}
              <span className={styles.image} onClick={() => openImageModal(feed)}>
                image
              </span>{" "}
              by {feed.type == "ur" ? "you" : <Link to={`/profile/${feed.recipient._id}`}>{upCaseFirstLetter(feed.recipient.userName)}</Link>}
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break
    }
    return el
  }

  const openImageModal = feed => {
    console.log(feed)
    let info = imageFromFeed(feed)
    setImageInfo(info)
    setShowImageModal(true)
  }

  const openReviewModal = feed => {
    // we apply these changes to use the Review Card component
    let info = feed.review
    info.business = feed.business
    setReviewInfo(info)
    setShowReviewModal(true)
  }

  return (
    <>
      {showImageModal && (
        <ImageModal
          images={imageInfo}
          close={() => {
            setShowImageModal(false)
          }}
          selectedImg={index}
          type="business"
        />
      )}

      {showReviewModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.close} onClick={() => setShowReviewModal(false)}>
              Close
            </div>
            <div className={styles.review}>
              <ReviewCard review={reviewInfo} />
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>{feeds && feeds.map((feed, i) => <div key={i}>{display(feed)}</div>)}</div>
    </>
  )
}

export default ProfileFeed
