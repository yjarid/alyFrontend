import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./TopBar.module.scss"
import SearchFilter from "../Search/SearchFilter/SearchFilter"
import LoginBtn from "../Register/Forms/LoginBtn/LoginBtn"

const TopBar = props => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleMenu = () => {
    setShowMobileMenu(prev => !prev)
  }

  return (
    <div className={styles.mainContainer}>
      {!showMobileMenu && (
        <div className={styles.TopBarMobile}>
          <div className={styles.TopBarMobileLogo}>
            <Link to={"/"}>
              <img src={require("../../static/image/logo.jpg")} />
            </Link>
          </div>
        </div>
      )}
      <div className={showMobileMenu ? `${styles.menuIcon} ${styles.menuIconClose}` : styles.menuIcon} onClick={toggleMenu}>
        <div className={styles.menuIconMidle}></div>
      </div>

      <div className={showMobileMenu ? `${styles.innerContainer} ${styles.innerContainerVisible}` : styles.innerContainer}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <img src={require("../../static/image/logo.jpg")} />
          </Link>
        </div>
        <div className={styles.grid}>
          <div className={styles.searchFilter}>
            <SearchFilter FP={false} />
          </div>
          <div className={styles.advSearch}>
            <Link to={"/map"}>Advanced Search</Link>
          </div>
          <div className={styles.login}>
            <LoginBtn FP={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
