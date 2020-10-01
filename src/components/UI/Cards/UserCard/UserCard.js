import React from "react"
import { Link } from "react-router-dom"
import styles from "./UserCard.module.scss"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"

const UserCard = ({ user }) => {
  return (
    <div key={user._id} className={styles.cardContainer}>
      <Link to={`/profile/${user._id}`}>
        <div className={styles.containerAvatar}>{user.picture ? <img src={user.picture} /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
      </Link>
      <div className={styles.userMeta}>
        <div className={styles.name}>
          {" "}
          <Link to={`/profile/${user._id}`}> {user.userName}</Link>
        </div>

        <div>
          <div className={styles.chipsContainer}>
            <div className="chip">
              <BsFillPeopleFill color="#0996e8" />
              <div className="label">{user.nbrFollowers || 0} </div>
            </div>
            <div className="chip">
              <BsStarFill color="#0996e8" />
              <div className="label">{user.nbrRev || 0} </div>
            </div>
            <div className="chip">
              <AiFillCamera color="#0996e8" />
              <div className="label">{user.revPic || 0}</div>
            </div>
          </div>

          <div className={styles.city}>{user.city}</div>
          {/* <div className={styles.description}>"{user.description}"</div> */}
        </div>
      </div>
    </div>
  )
}

export default UserCard
