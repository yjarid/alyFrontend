import React from "react"
import { Switch, Route } from "react-router-dom"
import ProfileCard from "./ProfileCard/ProfileCard"
import ProfileTabs from "./ProfileTabs/ProfileTabs"
import ProfileBusiness from "./ProfileBusiness/ProfileBusiness"
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto"
import ProfileFriend from "./ProfileFriend/ProfileFriend"
import ProfileReview from "./ProfileReview/ProfileReview"
import ProfileFeed from "./ProfileFeed/ProfileFeed"
import styles from "./ProfileMain.module.scss"
import { useQuery } from "@apollo/react-hooks"
import { ME } from "../../../qraphQl/userType"

const ProfileMain = ({ info, tab }) => {
  let { recipient, followings, followers, business, reviews, ...user } = info
  const { data } = useQuery(ME)

  // const tab = match.params.tab
  followers = followers.map(fol => fol.follower)

  const isOwner = data ? data.me._id == user._id : false

  return (
    <div>
      <ProfileCard user={user} followers={followers} me={data ? data.me : null} />

      <ProfileTabs profile={user._id} tab={tab} me={data ? data.me : null} />
      <div className={styles.mainArea}>
        <Switch>
          <Route path={`/profile/:id`} render={() => <ProfileFeed />} exact={true} />
          <Route path={`/profile/:id/business`} render={() => <ProfileBusiness business={business} isOwner={isOwner} />} />
          <Route path={`/profile/:id/photo`} render={() => <ProfilePhoto reviews={reviews} isOwner={isOwner} />} />
          <Route path={`/profile/:id/friend`} render={() => <ProfileFriend friend={followers} />} />
          <Route path={`/profile/:id/review`} render={() => <ProfileReview reviews={reviews} />} />
        </Switch>
      </div>
    </div>
  )
}

export default ProfileMain
