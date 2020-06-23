import React from "react"
import styles from "./BuzSingleDesc.module.scss"

function BuzSingleDesc(props) {
  return (
    <div>
        <div className={styles.mainBody}>
          <h2 className="sectionTitle">About the Business</h2>
          <div>{props.desc}</div>
        </div>
    </div>
  )
}

export default BuzSingleDesc
