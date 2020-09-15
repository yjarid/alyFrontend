import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { timeAgo } from "../../../utils/timeAgo"
import styles from "./ImageModal.module.scss"
import { FaUserCircle } from "react-icons/fa"
import { BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import Clap from "../Clap/Clap"
import AlyScore from "../AlyScore/AlyScore"
import { StateContext } from "../../../Context"

export default function ImageModal({ close, images, selectedImg, type }) {
  // this par is only for admin rating of reviews
  const appState = useContext(StateContext)

  let initialIndex = selectedImg ? selectedImg : 0
  const [index, setIndex] = useState(initialIndex)

  const moveImage = i => {
    setIndex(prevIndex => prevIndex + i)
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.imageMeta}>
        <div className={styles.user}>
          <div className={styles.imgContainer}>
            <Link to={`/${type === "business" ? "business" : "profile"}/${images[index].id}`}>
              <div className={styles.revContainerAvatar}>{images[index].profPic ? <img src={images[index].profPic} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            </Link>
          </div>

          <div>
            <h2 className={styles.userName}>
              <Link to={`/${type === "business" ? "business" : "profile"}/${images[index].id}`}>{images[index].name}</Link>
            </h2>
            <div className="chipsContainer">
              <div className="chip">
                <BsStarFill color="#0996e8" />
                <div className="label">{images[index].nbrRev} </div>
              </div>
              <div className="chip">
                <AiFillCamera color="#0996e8" />
                <div className="label">{images[index].revPic}</div>
              </div>
            </div>
            <p className={styles.date}>{timeAgo(images[index].createdAt)}</p>
          </div>
        </div>
        <div className={styles.description}>{images[index].picDesc}</div>

        <div className={styles.likebtn}>
          <Clap claps={images[index].picClaps} id={images[index].picId} />
        </div>

        {appState.user.type === "ADMIN" && <AlyScore type="image" initAlyScore={images[index].picAlyScore} id={images[index].picId} />}
      </div>
      <div className={styles.image}>
        <span className={styles.close} onClick={close}>
          &times;
        </span>
        <img className={styles.modalContent} src={images[index].picture.replace("t_meduim", "t_large")} alt="Snow" />
        {index !== 0 && (
          <span className={styles.prev} onClick={() => moveImage(-1)}>
            &#10094;
          </span>
        )}
        {index !== images.length - 1 && (
          <span className={styles.next} onClick={() => moveImage(1)}>
            &#10095;
          </span>
        )}
      </div>
    </div>
  )
}
