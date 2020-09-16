import React, { useContext, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import ProfileCard from "./ProfileComp/ProfileCard/ProfileCard"
import ProfileTabs from "./ProfileComp/ProfileTabs/ProfileTabs"
import ProfileBusiness from "./ProfileComp/ProfileBusiness/ProfileBusiness"
import ProfilePhoto from "./ProfileComp/ProfilePhoto/ProfilePhoto"
import ProfileFriend from "./ProfileComp/ProfileFriend/ProfileFriend"
import ProfileReview from "./ProfileComp/ProfileReview/ProfileReview"
import ProfileFeed from "./ProfileComp/ProfileFeed/ProfileFeed"
import styles from "./ProfileMain.module.scss"
import { useQuery } from "@apollo/react-hooks"
import { PROFILE_INFO_WITH_FOLLOWERS } from "../../qraphQl/userType"
import Page from "../Page/Page"
import { DispatchContext, StateContext } from "../../Context"
import Spinner from "../UI/Spinner/Spinner"

const ProfileMain = props => {
  const appDispatch = useContext(DispatchContext)
  const stateDispatch = useContext(StateContext)

  const userId = props.match.params.id
  const { loading, data, error } = useQuery(PROFILE_INFO_WITH_FOLLOWERS, { variables: { id: userId } })

  // QUERIES

  useEffect(() => {
    if (error) {
      appDispatch({ type: "flashMessage", value: { message: "Something is wrong", type: "error" } })
    }
  }, [error])

  const tab = props.match.params.tab
  let followers = data ? data.user.followers.map(fol => fol.follower) : []
  let loggedInUserID = stateDispatch.user.userId
  let isOwner = userId === loggedInUserID

  return (
    <Page title="Profile" withTopBar={true}>
      {loading && <Spinner />}
      {typeof data != "undefined" && data && (
        <>
          <ProfileCard user={data.user} loggedInUserID={loggedInUserID} />

          <ProfileTabs userId={userId} isOwner={isOwner} tab={tab} />

          <div className={styles.mainArea}>
            <Switch>
              <Route path={`/profile/:id`} render={() => <ProfileFeed />} exact={true} />

              <Route path={`/profile/:id/business`} render={() => <ProfileBusiness isOwner={isOwner} />} />

              <Route path={`/profile/:id/photo`} render={() => <ProfilePhoto isOwner={isOwner} />} />

              {/* <Route path={`/profile/:id/friend`} render={() => <ProfileFriend friend={followers} />} />
              <Route path={`/profile/:id/review`} render={() => <ProfileReview reviews={reviews} />} /> */}
            </Switch>
          </div>
        </>
      )}
    </Page>
  )
}

export default ProfileMain
