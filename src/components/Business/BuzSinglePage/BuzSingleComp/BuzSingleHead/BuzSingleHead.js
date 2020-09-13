import React, { useState, Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { Chip, makeStyles } from "@material-ui/core"
import styles from "./BuzSingleHead.module.scss"
import GradeIcon from "@material-ui/icons/Grade"
import Modal from "../../../../UI/Modal/Modal"
import AddReview from "../../../../Review/AddReview"
import AddClaim from "./AddClaim/AddClaim"
import { loginRequired } from "../../../../../AccessToken"
import { StyledRating } from "../../../../UI/CustomFields/StyledRating"
import { upCaseFirstLetter } from "../../../../../utils/string"
import { DispatchContext } from "../../../../../Context"
import { useMediaQuery } from "react-responsive"
import { AiOutlineShop } from "react-icons/ai"
import ReportForm from "../../../../UI/ReportForm/ReportForm"

const useStyles = makeStyles(theme => ({
  chip: {
    padding: "1rem",
    fontSize: "0.9rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem"
    }
  }
}))

function BuzSingleHead({ history, business }) {
  const classes = useStyles()
  const [buzStat, setBuzStat] = useState(null)
  const appDispatch = useContext(DispatchContext)
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState("review")
  const isTablet = useMediaQuery({
    query: "(min-device-width: 768px)"
  })

  let { _id, name, neighborhood, city, picture, subCat, cat, nbrRev, totRev, owner, price } = business

  if (buzStat != null) {
    nbrRev = buzStat.nbrRev
    totRev = buzStat.totRev
  }

  let rating = nbrRev ? totRev / nbrRev : 0

  const modalClosed = () => {
    setModal(false)
  }

  const openModal = type => {
    let login = loginRequired(history, appDispatch)

    if (login) {
      setModalContent(type)
      setModal(true)
    }
  }

  return (
    <Fragment>
      <Modal show={modal} modalClosed={modalClosed}>
        {modalContent == "review" && <AddReview businessId={_id} setBuzStat={setBuzStat} modalClosed={modalClosed} />}
        {modalContent == "claim" && <AddClaim businessId={_id} modalClosed={modalClosed} />}
        {modalContent == "report" && <ReportForm id={_id} type="BUS" modalClosed={modalClosed} />}
      </Modal>
      <div className={styles.head}>
        <div className={styles.headInner}>
          <div className={styles.imageContainer}>{picture ? <img src={picture} /> : <AiOutlineShop size="90%" color="#0996e8" />}</div>
          <div>
            <h2 className={styles.name}>{upCaseFirstLetter(name)}</h2>
            <div className={styles.price}>{price}</div>
            <div className={styles.revRating}>
              <StyledRating value={rating} size={!isTablet ? "small" : "medium"} precision={0.5} readOnly />
              <div>
                {nbrRev} review{nbrRev > 1 ? "s" : null}
              </div>
            </div>
            <div className={styles.location}>
              <Link to={`/tax/location/${city}/${neighborhood}?cat=${cat}`}>{neighborhood}, </Link>
              <Link to={`/tax/location/${city}?cat=${cat}`}>{city} </Link>
            </div>
            <div className={styles.subCat}>
              {subCat.map((subCat, i) => (
                <span key={i}>
                  <Link to={`/tax/category/${cat}/${subCat}?city=${city}`}>{subCat}, </Link>{" "}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.reviewClaim}>
          <div className={styles.reviewBtn}>
            <Chip className={classes.chip} color="primary" size={isTablet ? "medium" : "small"} icon={<GradeIcon />} label="Review Business" clickable={true} onClick={() => openModal("review")} />
          </div>

          {!owner && (
            <div className={styles.claim} onClick={() => openModal("claim")}>
              Claim it !
            </div>
          )}
        </div>
      </div>
      <p className={styles.report}>
        if review is inappropriate please
        <span className={styles.reportbtn} onClick={() => openModal("report")}>
          report it
        </span>
      </p>
    </Fragment>
  )
}

export default BuzSingleHead
