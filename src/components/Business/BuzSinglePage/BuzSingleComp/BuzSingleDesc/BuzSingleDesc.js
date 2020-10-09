import React from "react"
import styles from "./BuzSingleDesc.module.scss"
import { FiPhoneCall } from "react-icons/fi"
import { GoLocation } from "react-icons/go"

function BuzSingleDesc({ address, desc, phone }) {
  return (
    <div>
      <div className={styles.mainBody}>
        <h2 className="sectionTitle">About the Business</h2>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.itemContainer}>
              <div className={styles.infoName}>
                <GoLocation size="1.2rem" color="#0996e8" />{" "}
              </div>{" "}
              <div className={styles.infoDetail}>{address}</div>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.infoName}>
                <FiPhoneCall size="1.2rem" color="#0996e8" />{" "}
              </div>{" "}
              <div className={styles.infoDetail}>{phone}</div>
            </div>
          </div>
          <div className={styles.desc}>{desc}</div>
        </div>
      </div>
    </div>
  )
}

export default BuzSingleDesc
