import React, { useState, useContext } from "react"
import styles from "./ReportForm.module.scss"
import { useMutation } from "@apollo/react-hooks"
import { CREATE_REPORT } from "../../../qraphQl/revStatType"
import { DispatchContext } from "../../../Context"

const ReportForm = ({ id, type }) => {
  const appDispatch = useContext(DispatchContext)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [desc, setDesc] = useState("explain why review is inapropriate")

  const [createRevReport, { loading }] = useMutation(CREATE_REPORT, {
    onCompleted() {
      setIsSubmiting(false)
      appDispatch({ type: "flashMessage", value: { message: "Thank you we will check the report", type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const descChange = e => {
    let val = e.target.value
    setDesc(e.target.value)
  }

  const submitDesc = () => {
    if (isSubmiting) {
      return
    }
    setIsSubmiting(true)
    let length = desc.length

    if (length == 0) {
      appDispatch({ type: "flashMessage", value: { message: `Please explain why`, type: "error" } })
      window.scrollTo(0, 0)
      setIsSubmiting(false)
    } else if (desc && length > 100) {
      appDispatch({ type: "flashMessage", value: { message: `Do not exceed 100 letters you are at ${length}`, type: "error" } })
      window.scrollTo(0, 0)
      setIsSubmiting(false)
    } else {
      createRevReport({
        variables: {
          id,
          type,
          report: desc
        }
      })
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div>
        <textarea className={styles.textAreaDesc} onChange={descChange} value={desc} />
      </div>
      <span className={styles.btnDesc} onClick={submitDesc}>
        Submit
      </span>
    </div>
  )
}

export default ReportForm
