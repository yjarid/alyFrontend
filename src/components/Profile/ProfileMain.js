import React, { useContext } from "react"
import { Switch, Route, useParams } from "react-router-dom"
import ProfileCard from "./ProfileComp/ProfileCard/ProfileCard"
import ProfileTabs from "./ProfileComp/ProfileTabs/ProfileTabs"
import ProfileBusiness from "./ProfileComp/ProfileBusiness/ProfileBusiness"
import ProfilePhoto from "./ProfileComp/ProfilePhoto/ProfilePhoto"
import ProfileFriend from "./ProfileComp/ProfileFriend/ProfileFriend"
import ProfileReview from "./ProfileComp/ProfileReview/ProfileReview"
import ProfileFeed from "./ProfileComp/ProfileFeed/ProfileFeed"
import styles from "./ProfileMain.module.scss"
import Page from "../Page/Page"
import { StateContext } from "../../Context"

const ProfileMain = props => {
  const stateDispatch = useContext(StateContext)

  const { tab, id } = useParams()
  let loggedInUserID = stateDispatch.user.userId
  let isOwner = id === loggedInUserID

  return (
    <Page title="Profile" withTopBar={true}>
      <ProfileCard loggedInUserID={loggedInUserID} />

      <ProfileTabs userId={id} isOwner={isOwner} tab={tab} />

      <div className={styles.mainArea}>
        <Switch>
          <Route path={`/profile/:id`} render={() => <ProfileFeed />} exact={true} />
          <Route path={`/profile/:id/business`} render={() => <ProfileBusiness isOwner={isOwner} />} />
          <Route path={`/profile/:id/photo`} render={() => <ProfilePhoto isOwner={isOwner} />} />
          <Route path={`/profile/:id/friend`} render={() => <ProfileFriend />} />
          <Route path={`/profile/:id/review`} render={() => <ProfileReview />} />
        </Switch>
      </div>
    </Page>
  )
}

export default ProfileMain
