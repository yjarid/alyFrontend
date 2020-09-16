import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import style from "./ProfileTabs.module.scss"

const ProfileTabs = ({ history, isOwner, userId, tab }) => {
  const [value, setValue] = useState(tab ? tab : "")

  const handleChange = (event, newValue) => {
    setValue(newValue)
    history.push(`/profile/${userId}/${newValue}`)
  }

  return (
    <div className={style.paper}>
      <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} variant="scrollable" scrollButtons="off">
        <Tab label="News" value="" />
        <Tab label="Reviews" value="review" />
        <Tab label="Followers" value="friend" />
        <Tab label="Photos" value="photo" />
        {isOwner && <Tab label="Business" value="business" />}
      </Tabs>
    </div>
  )
}

export default withRouter(ProfileTabs)
