import React, { useContext } from "react"
import { Link } from "react-router-dom"
import BuzCard from "../../../UI/Cards/BuzCard/BuzCard"
import { MyButton } from "../../../UI/CustomFields/CustomField"
import styles from "./ProfileBusiness.module.scss"

function ProfileBusiness({ ownedBus, isOwner }) {
  return (
    <section>
      <div className={styles.container}>
        {ownedBus.map(buz => {
          const { _id } = buz
          return (
            <div key={_id} className={styles.OneBuz}>
              <BuzCard data={buz} />
              <div></div>
              {isOwner && (
                <div className={styles.actionEdit}>
                  <Link to={`/business/edit/${buz._id}`} style={{ textDecoration: "none" }}>
                    <MyButton variant="contained" color="secondary">
                      edit
                    </MyButton>
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProfileBusiness
