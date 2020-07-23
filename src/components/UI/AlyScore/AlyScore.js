import React, { useState } from "react"
import { UPDATE_IMAGE } from "../../../qraphQl/imageType"
import { UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import { useMutation } from "@apollo/react-hooks"
import { useEffect } from "react"

function AlyScore({ type, id, initAlyScore }) {
  const [alyScore, setAlyScore] = useState("0")

  useEffect(() => {
    // allow aly score to change when sliding from one image to another
    setAlyScore(initAlyScore)
  }, [initAlyScore])

  const graphQlQuery = type == "review" ? UPDATE_REVIEW : UPDATE_IMAGE

  const [updateAlyScore, { data, error, loading }] = useMutation(graphQlQuery)

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

    console.log(score)
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
