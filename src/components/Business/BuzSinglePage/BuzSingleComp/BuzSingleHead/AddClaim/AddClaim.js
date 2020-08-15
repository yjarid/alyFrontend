import React, { useContext, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import Spinner from "../../../../../UI/Spinner/Spinner"
import { CREATE_CLAIM } from "../../../../../../qraphQl/claimType"
import { DispatchContext } from "../../../../../../Context"
import styles from "./AddClaim.module.scss"

function AddClaim({ businessId, modalClosed }) {
  const appDispatch = useContext(DispatchContext)
  const [contentValue, setContentValue] = useState(null)
  const [content, setContent] = useState(null)

  const [createClaim, { loading }] = useMutation(CREATE_CLAIM, {
    onCompleted({ createClaim }) {
      if (createClaim.status == "YES") {
        appDispatch({ type: "flashMessage", value: { message: `Congratulation !! you sucessfully claimed the business`, type: "success" } })
      } else {
        appDispatch({ type: "flashMessage", value: { message: `claim is sent, we will get back to you soon`, type: "success" } })
      }

      window.scrollTo(0, 0)
      modalClosed()
    },
    onError(err) {
      appDispatch({ type: "flashMessage", value: { message: err.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
      modalClosed()
    }
  })

  const sendClaim = () => {
    if (content == "code") {
      createClaim({ variables: { business: businessId, code: contentValue } })
    } else {
      createClaim({ variables: { business: businessId, phone: contentValue } })
    }
  }

  return (
    <>
      <div className={styles.form}>
        {loading && <Spinner />}
        <h2 className={styles.title}>Add a Claim</h2>

        <div className={styles.label}>do you have the claim code ? </div>
        <span className={styles.btn} onClick={() => setContent("code")}>
          Yes
        </span>
        <span className={styles.btn} onClick={() => setContent("phone")}>
          No
        </span>
        {content && (
          <div>
            {content == "code" && <div className={styles.label}>Enter your code bellow</div>}
            {content == "phone" && <div className={styles.label}>we need to verify who you are, please enter your Phone number , we will contact you soon</div>}

            <input type="text" value={contentValue} onChange={e => setContentValue(e.target.value)} />
            <div className={styles.sendBtn} onClick={sendClaim}>
              Send
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AddClaim
