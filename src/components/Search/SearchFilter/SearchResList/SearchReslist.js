import React from "react"
import { upCaseFirstLetter } from "../../../../utils/string"
import styles from "./SearchResList.module.scss"

function SearchResList({ data, name, selectSearchVal }) {
  return (
    <div className={styles.result}>
      <div className={styles.innerResult}>
        {typeof data != "undefined" && data.length ? (
          data.map(result => {
            const value = name == "name" ? result.name : result.neigh
            return (
              <div className={styles.item} key={result._id} onClick={() => selectSearchVal(value, name, result.cat)}>
                {upCaseFirstLetter(result.name)}
              </div>
            )
          })
        ) : (
          <div className={styles.noData}>no data</div>
        )}
      </div>
    </div>
  )
}

export default SearchResList
