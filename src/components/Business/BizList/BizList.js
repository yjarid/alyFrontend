import React, { useContext, useEffect } from "react"
import styles from "./BizList.module.scss"
import BuzCard from "../../UI/Cards/BuzCard/BuzCard"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { useLazyQuery } from "@apollo/react-hooks"
import Spinner from "../../UI/Spinner/Spinner"
import { DispatchContext } from "../../../Context"
import useDefinePage from "../../../useFuction/useDefinePage"

const BizList = () => {
  const appDispatch = useContext(DispatchContext)

  const PER_PAGE = 6
  let page = useDefinePage() * 0

  // QUERIES
  const [getBusinesses, { loading, data }] = useLazyQuery(GET_BUSINESSES, {
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  useEffect(() => {
    if (page >= 0) {
      getBusinesses({ variables: { first: PER_PAGE, skip: PER_PAGE * page, orderBy: "score_DESC", published: true, authorID: null } })
    }
  }, [page])

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
