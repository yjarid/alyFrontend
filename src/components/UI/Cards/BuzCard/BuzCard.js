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
          <div className={styles.imageContainer}>{data.picture ? <img src={data.picture.replace("t_meduim", "t_small")} /> : <AiOutlineShop size="100%" color="#0996e8" />}</div>
          <div>
            <h2 className={styles.title}>
              <Link to={`/business/${data._id}`}>{upCaseFirstLetter(data.name)} </Link>{" "}
            </h2>
            {data.price && <div className={styles.price}>{data.price}</div>}
            <div className={styles.location}>
              <Link to={`/tax/location/${data.city}/${data.neighborhood}?cat=${data.cat}`}>{data.neighborhood}, </Link>
              <Link to={`/tax/location/${data.city}?cat=${data.cat}`}>{data.city} </Link>
            </div>
            <div className={styles.subCat}>
              {data.subCat.map((subCat, i) => (
                <span key={i}>
                  <Link to={`/tax/category/${data.cat}/${subCat}?city=${data.city}`}>{subCat}, </Link>{" "}
                </span>
              ))}
            </div>

            <div className={styles.rating}>
              <StyledRating name="customized-color" value={rating} precision={0.5} size="small" readOnly />
              <div>{data.nbrRev} reviews</div>
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
