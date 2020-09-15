import React from "react"
import styles from "./ProfileFriend.module.scss"
import UserCard from "../../../UI/Cards/UserCard/UserCard"

function ProfileFriend({ friend }) {
  return (
    <div className={styles.gridContainer}>
      {friend.map((fr, i) => (
        <UserCard friend={fr} key={i} />
      ))}
    </div>
  )
}

export default ProfileFriend
