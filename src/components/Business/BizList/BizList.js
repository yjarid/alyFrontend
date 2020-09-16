import React, { useEffect } from "react"
import styles from "./BizList.module.scss"
import BuzCard from "../../UI/Cards/BuzCard/BuzCard"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { useLazyQuery } from "@apollo/react-hooks"
import Spinner from "../../UI/Spinner/Spinner"

const BizList = () => {
  // QUERIES
  const [getBusiness, { loading, data, error }] = useLazyQuery(GET_BUSINESSES)

  useEffect(() => {
    getBusiness({ variables: { published: true, authorID: null, first: 8 } })
  }, [])

  const display = () => {
    let body = null
    if (loading) {
      body = <Spinner />
    } else if (error) {
      body = null
    } else if (typeof data !== "undefined") {
      const { businesses } = data
      body = (
        <div className={styles.bizList}>
          {businesses.map(item => (
            <BuzCard key={item._id} data={item} />
          ))}
        </div>
      )
    }

    return body
  }

  return (
    <div>
      <h2 className="sectionTitle"> Popular this week</h2>
      {display()}
    </div>
  )
}

export default BizList
