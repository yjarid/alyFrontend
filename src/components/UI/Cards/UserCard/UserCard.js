import React from "react"
import { Link } from "react-router-dom"
import styles from "./UserCard.module.scss"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"

const UserCard = ({ friend }) => {
  return (
    <div key={friend._id} className={styles.cardContainer}>
      <Link to={`/profile/${friend._id}`}>
        <div className={styles.containerAvatar}>{friend.picture ? <img src={friend.picture} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
      </Link>
      <div className={styles.userMeta}>
        <div className={styles.name}>
          {" "}
          <Link to={`/profile/${friend._id}`}> {friend.userName}</Link>
        </div>

        <div>
          <div className={styles.chipsContainer}>
            <div className="chip">
              <BsFillPeopleFill color="#0996e8" />
              <div className="label">{friend.nbrRev} </div>
            </div>
            <div className="chip">
              <BsStarFill color="#0996e8" />
              <div className="label">{friend.nbrRev} </div>
            </div>
            <div className="chip">
              <AiFillCamera color="#0996e8" />
              <div className="label">{friend.revPic}</div>
            </div>
          </div>

          <div className={styles.city}>{friend.city}</div>
          {/* <div className={styles.description}>"{friend.description}"</div> */}
        </div>
      </div>
    </div>
  )
}

export default UserCard
