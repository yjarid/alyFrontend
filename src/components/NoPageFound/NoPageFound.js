import React from "react"
import styles from "./NoPageFound.module.scss"
import { Link } from "react-router-dom"

function NoPageFound() {
  return (
    <div className="container">
      <div className={styles.InnerContainer}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <img src={require("../../static/image/logoBig.png")} alt="Aly's Logo" />
          </div>
        </Link>

        <div className={styles.desc}>Ooops! Looks like you are lost. No wories just click on Aly.</div>
      </div>
    </div>
  )
}

export default NoPageFound
