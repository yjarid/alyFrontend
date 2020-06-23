import React from "react"
import styles from "./ProfileFriend.module.scss"
import { useParams } from "react-router-dom"
import UserCard from "../../../UI/Cards/UserCard/UserCard"
import { GET_FOLLOWERS } from "../../../../qraphQl/followType"
import { useQuery } from "@apollo/react-hooks"

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
