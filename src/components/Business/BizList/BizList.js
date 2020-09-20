import React, { useContext } from "react"
import styles from "./BizList.module.scss"
import BuzCard from "../../UI/Cards/BuzCard/BuzCard"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { useQuery } from "@apollo/react-hooks"
import Spinner from "../../UI/Spinner/Spinner"
import { DispatchContext } from "../../../Context"

const BizList = () => {
  const appDispatch = useContext(DispatchContext)
  // QUERIES
  const { loading, data } = useQuery(GET_BUSINESSES, {
    variables: { published: true, authorID: null, first: 8 },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  return (
    <div>
      <h2 className="sectionTitle"> Popular this week</h2>
      {loading && <Spinner />}
      {data && data.businesses && (
        <div className={styles.bizList}>
          {data.businesses.map(item => (
            <BuzCard key={item._id} data={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BizList
