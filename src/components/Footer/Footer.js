import React, { useEffect } from "react"
import styles from "./Footer.module.scss"
import { AiFillFacebook, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai"

function ComponentName() {
  return (
    <footer>
      <div className={styles.top}>
        <div>
          <img src={require("../../static/image/logo.png")} alt="" />
        </div>
        <div>
          <strong className={styles.title}>Service</strong>
        </div>
        <div>
          <strong className={styles.title}>Resources</strong>
          <ul>
            <li>Videos</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <strong className={styles.title}>Company</strong>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <strong className={styles.title}>Connect</strong>
          <div className={styles.socialMedia}>
            <span>
              <AiFillFacebook size="1.5rem" color="#0996e8" />
            </span>
            <span>
              <AiOutlineInstagram size="1.5rem" color="#0996e8" />
            </span>
            <span>
              <AiOutlineYoutube size="1.5rem" color="#0996e8" />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.copyright}>Copyright © 2020 Digitopia Studio LLC</div>
          <div className={styles.law}>
            <div>Terms of Use</div>
            <div>Privacy Policy</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ComponentName
