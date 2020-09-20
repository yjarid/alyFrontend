import React, { useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { feedConcat } from "../../../../utils/feedConcat"
import { timeAgo } from "../../../../utils/timeAgo"
import { upCaseFirstLetter } from "../../../../utils/string"
import { PROFILE_INFO_FEED } from "../../../../qraphQl/userType"
import { useQuery } from "@apollo/react-hooks"
import styles from "./ProfileFeed.module.scss"
import ImageModal from "../../../UI/ImageModal/ImageModal"
import { FaUserCircle } from "react-icons/fa"
import imageFromFeed from "../../../../utils/imageFromFeed"
import { DispatchContext } from "../../../../Context"

function ProfileFeed() {
  const { id } = useParams()
  const appDispatch = useContext(DispatchContext)

  const { data } = useQuery(PROFILE_INFO_FEED, {
    variables: { id },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })
  const [imageInfo, setImageInfo] = useState([])
  const [showImageModal, setShowImageModal] = useState(false)

  let feeds = null

  if (data) {
    feeds = feedConcat(data.user)
  }

  const display = feed => {
    let el = null
    switch (feed.action) {
      case "ADD_BUS":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performer.picture ? <img src={feed.performer.picture} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>

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
            <div className={styles.containerAvatar}>{feed.performer.picture ? <img src={feed.performer.picture} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
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
            <div className={styles.containerAvatar}>{feed.performer.picture ? <img src={feed.performer.picture} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> added a
              <Link to={`/review/${feed.review._id}`}>
                {" "}
                <span className={styles.image}> review </span>{" "}
              </Link>
              to <Link to={`/business/${feed.business._id}`}>{upCaseFirstLetter(feed.business.name)}</Link>
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break
      case "CLAP_REVIEW":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performer.picture ? <img src={feed.performer.picture} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> clapped to {feed.type === "ur" ? "your" : "a"}{" "}
              <Link to={`/review/${feed.review._id}`}>
                <span className={styles.image}>review</span>
              </Link>{" "}
              for <Link to={`/business/${feed.business._id}`}>{upCaseFirstLetter(feed.business.name)}</Link>
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break

      case "CLAP_IMAGE":
        el = (
          <div className={styles.feedEl}>
            <div className={styles.containerAvatar}>{feed.performer.picture ? <img src={feed.performer.picture} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            <div className={styles.section}>
              <Link to={`/profile/${feed.performer._id}`}>{upCaseFirstLetter(feed.performer.userName)}</Link> clapped to an{" "}
              <span className={styles.image} onClick={() => openImageModal(feed)}>
                image
              </span>{" "}
              by {feed.type === "ur" ? "you" : <Link to={`/profile/${feed.recipient._id}`}>{upCaseFirstLetter(feed.recipient.userName)}</Link>}
              <span className={styles.timeAgo}>{timeAgo(feed.createdAt)}</span>
            </div>
          </div>
        )
        break
    }
    return el
  }

  const openImageModal = feed => {
    let info = imageFromFeed(feed)
    setImageInfo(info)
    setShowImageModal(true)
  }

  return (
    <>
      {showImageModal && (
        <ImageModal
          images={imageInfo}
          close={() => {
            setShowImageModal(false)
          }}
          type="business"
        />
      )}

      <div className={styles.container}>{feeds && feeds.map((feed, i) => <div key={i}>{display(feed)}</div>)}</div>
    </>
  )
}

export default ProfileFeed
