import React, { useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./ProfileCard.module.scss"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { CREATE_FOLLOW, DELETE_FOLLOW } from "../../../../qraphQl/followType"
import { useMediaQuery } from "react-responsive"
import { DispatchContext } from "../../../../Context"
import { upCaseFirstLetter } from "../../../../utils/string"
import { BsFillPeopleFill, BsStarFill } from "react-icons/bs"
import { AiFillCamera } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { IS_FOLLOWING, PROFILE_INFO } from "../../../../qraphQl/userType"

function ProfileCard({ loggedInUserID }) {
  const isTablet = useMediaQuery({
    query: "(min-device-width: 768px)"
  })

  const appDispatch = useContext(DispatchContext)

  const { id } = useParams()

  const { loading, data } = useQuery(PROFILE_INFO, {
    variables: { id },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })
  const { data: dataIsFollow, error: errorisFollow } = useQuery(IS_FOLLOWING, { variables: { id } })

  let user = data ? data.user : null

  const [addFollow] = useMutation(CREATE_FOLLOW, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `you are now following ${user.userName}`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const [removeFollow] = useMutation(DELETE_FOLLOW, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `no longer following ${user.userName}`, type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  let owner = false
  let areUFoll = false
  if (user) {
    owner = user._id === loggedInUserID
    areUFoll = dataIsFollow ? dataIsFollow.isFollowing : null
  }

  const follow = () => {
    addFollow({ variables: { user: user._id } })
  }
  const unFollow = () => {
    removeFollow({ variables: { user: user._id } })
  }

  const displayFollowBtn = () => {
    if (owner || !loggedInUserID) {
      return null
    } else if (areUFoll) {
      return (
        <div className={styles.unFollowBtn} onClick={unFollow}>
          unFollow
        </div>
      )
    }

    return (
      <div className={styles.followBtn} onClick={follow}>
        Follow Me
      </div>
    )
  }

  return (
    <>
      {user && (
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderAvatar}>
            <div className={styles.containerAvatar}>{user.picture ? <img src={user.picture} alt="" /> : <FaUserCircle size="90%" color="#0996e8" />}</div>
            {displayFollowBtn()}
          </div>

          <div>
            <div className={styles.cardHeadersect}>
              <span className={styles.cardHeaderName}>{upCaseFirstLetter(user.userName)}</span>
              {owner && (
                <>
                  <div className={styles.editBtn}>
                    <Link to={`/profile/edit/${user._id}`}>Edit Profile</Link>
                  </div>
                  <div className={styles.cardHeaderAddBuz}>
                    <Link to="/business/create">Add Business</Link>
                  </div>
                </>
              )}
            </div>
            <div className={styles.center}>
              <div className="chipsContainer">
                <div className="chip">
                  <BsFillPeopleFill color="#0996e8" />
                  <div className="label">{`${user.nbrFollowers || 0} ${isTablet ? "Followers" : ""}`}</div>
                </div>
                <div className="chip">
                  <BsStarFill color="#0996e8" />
                  <div className="label">{`${user.nbrRev} ${isTablet ? "Reviews" : ""}`} </div>
                </div>
                <div className="chip">
                  <AiFillCamera color="#0996e8" />
                  <div className="label">{`${user.revPic} ${isTablet ? "Photos" : ""}`}</div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.cardHeaderCity}>{user.city}</div>
              <div className={styles.cardHeaderQuote}>"{user.description}"</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileCard
