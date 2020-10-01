import React from "react"
import styles from "./ProfileFriend.module.scss"
import UserCard from "../../../UI/Cards/UserCard/UserCard"
import { FOLLOWERS_USER } from "../../../../qraphQl/followType"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"

function ProfileFriend() {
  const { id } = useParams()

  const { loading, data, error } = useQuery(FOLLOWERS_USER, { variables: { userID: id } })

  let friend = data ? data.followers : []
  return (
    <div className={styles.gridContainer}>
      {friend.map((fr, i) => (
        <UserCard user={fr.follower} key={i} />
      ))}
    </div>
  )
}

export default ProfileFriend
