import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_BUSINESS } from "../../../../qraphQl/businessType"
import { makeStyles, CardMedia } from "@material-ui/core"
import { Link } from "react-router-dom"
import { timeAgo } from "../../../../utils/timeAgo"
import styles from "./PreviewBus.module.scss"
import { DispatchContext } from "../../../../Context"

const useStyles = makeStyles(theme => ({
  media: {
    height: "15rem",
    width: "15rem"
  }
}))

export default function PreviewBus({ bus = {} }) {
  const { _id, name, desc, address, city, neighborhood, cat, subCat, picture, createdAt } = bus
  const appDispatch = useContext(DispatchContext)
  const classes = useStyles()

  const [publish] = useMutation(UPDATE_BUSINESS, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `Business is published`, type: "success" } })
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message, type: "success" } })
    }
  })

  const togglePublish = () => {
    publish({ variables: { id: _id, published: true } })
  }

  return (
    <div>
      {typeof bus.author != "undefined" && (
        <div>
          {picture && <CardMedia className={classes.media} image={picture} title="Paella dish" />}
          <p> author : {bus.author.name}</p>
          <p> email : {bus.author.email}</p>
          <p>created : {timeAgo(createdAt)}</p>
          <p>name : {name}</p>
          <p>desc: {desc}</p>
          <p>address: {address}</p>
          <p>city : {city}</p>
          <p>neighborhood : {neighborhood}</p>
          <p> category : {cat}</p>
          <p> subCat : {subCat ? subCat.map(s => s).join(", ") : null}</p>

          <button onClick={togglePublish}> publish</button>
          <Link to={`/business/edit/${_id}`}>
            {" "}
            <span className={styles.edit}>Edit</span>
          </Link>
        </div>
      )}
    </div>
  )
}
