import React from "react"
import styles from "./FlashMessage.module.scss"

const FlashMessage = React.forwardRef((props, ref) => {
  console.log(props)
  return (
    <div ref={ref} className={styles.floatingAlerts}>
      {props.messages.map((msg, index) => {
        const alertStyle = props.type == "success" ? styles.alertSuccess : styles.alertError

        return (
          <div key={index} className={`${styles.floatingAlert} ${alertStyle}`}>
            {msg}
          </div>
        )
      })}
    </div>
  )
})

export default FlashMessage
