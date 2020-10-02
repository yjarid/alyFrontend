import React from "react"
import { Link } from "react-router-dom"
import styles from "./BuzCard.module.scss"
import { truncate, upCaseFirstLetter } from "../../../../utils/string"
import { StyledRating } from "../../../UI/CustomFields/StyledRating"
import { AiOutlineShop } from "react-icons/ai"

const BuzCard = ({ data }) => {
  let rating = data.nbrRev ? data.totRev / data.nbrRev : 0

  return (
    <div className={styles.paper}>
      <div className={styles.head}>
        <div className={styles.headInner}>
          <div className={styles.imageContainer}>{data.picture ? <img src={data.picture} /> : <AiOutlineShop size="75%" color="#0996e8" />}</div>
          <div>
            <h2 className={styles.title}>
              <Link to={`/business/${data._id}`}>{upCaseFirstLetter(data.name)} </Link>{" "}
            </h2>
            <div className={styles.rating}>
              <StyledRating name="customized-color" value={rating} precision={0.5} size="small" readOnly />
              <div>{data.nbrRev} reviews</div>
            </div>

            <div className={styles.subCat}>
              {data.price && <span className={styles.price}>{data.price}</span>}
              {data.subCat.map((subCat, i) => (
                <span key={i}>
                  <Link to={`/tax/category/${data.cat}/${subCat}?city=${data.city}`}>{upCaseFirstLetter(subCat)}, </Link>{" "}
                </span>
              ))}
            </div>

            <div className={styles.location}>
              <Link to={`/tax/location/${data.city}/${data.neighborhood}?cat=${data.cat}`}>{data.neighborhood} </Link>
            </div>
          </div>
        </div>
        {data.excerpt && (
          <div className={styles.excerptContainer}>
            <div className={styles.excerpt}>{data.excerpt}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuzCard
