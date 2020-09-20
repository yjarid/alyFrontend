import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { PROFILE_INFO_OWNEDBUSINESS } from "../../../../qraphQl/userType"
import { useQuery } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import BuzCard from "../../../UI/Cards/BuzCard/BuzCard"
import { MyButton } from "../../../UI/CustomFields/CustomField"
import styles from "./ProfileBusiness.module.scss"
import { DispatchContext } from "../../../../Context"

function ProfileBusiness({ isOwner }) {
  const appDispatch = useContext(DispatchContext)
  const { id } = useParams()
  const { data } = useQuery(PROFILE_INFO_OWNEDBUSINESS, {
    variables: { id },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  let ownedBus = data ? data.user.ownedBus : []

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
