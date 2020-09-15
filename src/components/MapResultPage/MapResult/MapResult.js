import React, { useRef, useEffect } from "react"
import BuzCard from "../../UI/Cards/BuzCard/BuzCard"
import styles from "./MapResult.module.scss"
import { scrollToRef } from "../../../utils/preventManyReq"

function MapResult({ data, selectedBus, selectedBusFunc, scroll }) {
  const myRef = useRef(null)

  const BusId = selectedBus ? selectedBus._id : null

  useEffect(() => {
    if (myRef.current && scroll) {
      scrollToRef(myRef)
    }
  }, [BusId, scroll])

  return (
    <div>
      <div className={styles.gridContainer}>
        {data.map((item, i) => {
          if (item._id === BusId) {
            return (
              <div key={i} ref={myRef} className={styles.selectedBus} onMouseEnter={() => selectedBusFunc(item)}>
                <BuzCard data={item} />
              </div>
            )
          }
          return (
            <div className={styles.busCard} key={i} onMouseEnter={() => selectedBusFunc(item, false)}>
              <BuzCard data={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MapResult
