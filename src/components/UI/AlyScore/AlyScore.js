import React, { useState, useEffect, useContext } from "react"
import { UPDATE_IMAGE } from "../../../qraphQl/imageType"
import { UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import { useMutation } from "@apollo/react-hooks"
import { DispatchContext } from "../../../Context"

function AlyScore({ type, id, initAlyScore }) {
  const appDispatch = useContext(DispatchContext)
  const [alyScore, setAlyScore] = useState("0")

  useEffect(() => {
    // allow aly score to change when sliding from one image to another
    setAlyScore(initAlyScore)
  }, [initAlyScore])

  const graphQlQuery = type == "review" ? UPDATE_REVIEW : UPDATE_IMAGE

  const [updateAlyScore] = useMutation(graphQlQuery, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: "Score updated", type: "success" } })
      window.scrollTo(0, 0)
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  const handleChange = e => {
    setAlyScore(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    let score = parseInt(alyScore)
    if (score > 100 || score < 0) {
      alert("score between 0 and 100")
      return
    }

    updateAlyScore({ variables: { id, alyScore: score } })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" pattern="[0-9]*" value={alyScore} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default AlyScore
