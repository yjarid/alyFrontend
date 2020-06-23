import React, { useState, Fragment, useContext } from "react"
import { upCaseFirstLetter } from "../../../utils/string"
import { DispatchContext } from "../../../Context"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { LOCATIONS, CATEGORIES } from "../../../qraphQl/taxonomyType"
import styles from "./AdvanceFilter.module.scss"
import { Checkbox, Radio, FormControl, FormGroup, RadioGroup, FormControlLabel, makeStyles, FormHelperText } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    "& .MuiTypography-body1": {
      fontSize: "12px"
    }
  }
})

export default function AdvanceFilter({ onFilter, parentCat }) {
  const appDispatch = useContext(DispatchContext)
  const classes = useStyles()
  const [city, setCity] = useState(null)
  const [cat, setCat] = useState(parentCat)
  const [level, setLevel] = useState("one")
  const [disable, setDisable] = useState(false)
  const [neigh, setNeigh] = useState(null)
  const [subCat, setSubCat] = useState([])
  const [price, setPrice] = useState("")

  const { data } = useQuery(CATEGORIES, { variables: { cat: "buz01" } })
  const { data: dataL } = useQuery(LOCATIONS, { variables: { cat: "city" } })

  const [getSubCat, { data: dataSC }] = useLazyQuery(CATEGORIES)
  const [getNeigh, { data: dataN }] = useLazyQuery(LOCATIONS)

  let locations = dataL ? dataL.locations : []
  let categories = data ? data.categories : []
  let neighborhood = dataN ? dataN.locations : []
  let subCategories = dataSC ? dataSC.categories : []

  let prices = ["$", "$$", "$$$", "$$$$"]

  const handleCheckboxChange = e => {
    let name = e.target.name

    if (e.target.checked == true) {
      if (subCat.length == 2) {
        setSubCat(prev => prev.concat(name))
        setDisable(true)
        return
      }
      setSubCat(prev => prev.concat(name))
    } else {
      setDisable(false)
      setSubCat(prev => prev.filter(v => v !== name))
    }
  }

  const setPriceRestaurant = e => {
    if (cat == "restaurant") setPrice(e.target.value)
  }

  const handleLevel = level => {
    if (level == "two") {
      if (!city || !cat) {
        appDispatch({ type: "flashMessage", value: { message: `you must select a city and business type`, type: "error" } })
        return
      }
      setLevel(level)
      let parsedCityName = JSON.parse(city).name
      getNeigh({ variables: { group: parsedCityName, cat: "neighborhood" } })
      getSubCat({ variables: { group: cat, cat: "buz02" } })
    } else {
      setLevel(level)
    }
  }

  const submitFilter = () => {
    onFilter(neigh, subCat, city, cat, price)
  }

  return (
    <div>
      <div className={styles.levelContainer}>
        <span className={styles.level} onClick={() => handleLevel("one")}>
          Step 1
        </span>
        <span className={styles.level} onClick={() => handleLevel("two")}>
          Step 2
        </span>
      </div>
      <div className={styles.mainContainer}>
        {level == "one" && (
          <div className={styles.formGridTop}>
            <div className={styles.formGridItem}>
              <p className={styles.sectionTitle}> Select City</p>
              <FormControl component="fieldset" className={classes.root}>
                <RadioGroup name="city" value={city} onChange={e => setCity(e.target.value)}>
                  <div className={styles.neighContainer}>
                    {locations.map((cat, i) => {
                      let catName = upCaseFirstLetter(cat.name) // to captalize values
                      return <FormControlLabel key={i} value={JSON.stringify(cat)} control={<Radio size="small" />} label={catName} />
                    })}
                  </div>
                </RadioGroup>
              </FormControl>
            </div>

            <div className={styles.formGridItem}>
              <p className={styles.sectionTitle}> Select Business Type</p>
              <FormControl component="fieldset" className={classes.root}>
                <RadioGroup name="subCat" value={cat} onChange={e => setCat(e.target.value)}>
                  <div className={styles.neighContainer}>
                    {categories.map((cat, i) => {
                      let catName = upCaseFirstLetter(cat.name) // to captalize values
                      return <FormControlLabel key={i} value={cat.name.toLowerCase()} control={<Radio size="small" />} label={catName} />
                    })}
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        )}

        {level == "two" && (
          <Fragment>
            <div className={styles.formGrid}>
              <div className={styles.formGridItem}>
                <p className={styles.sectionTitle}> Select Neighborhood</p>

                <div className={styles.formGridItemScroll}>
                  <FormControl component="fieldset" className={classes.root}>
                    <RadioGroup
                      name="subCat"
                      value={neigh}
                      onChange={e => {
                        setNeigh(e.target.value)
                      }}
                    >
                      <div className={styles.neighContainer}>
                        {neighborhood.map((cat, i) => {
                          let catName = upCaseFirstLetter(cat.name) // to captalize values
                          return <FormControlLabel key={i} value={JSON.stringify(cat)} control={<Radio size="small" />} label={catName} />
                        })}
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div className={styles.formGridItem}>
                <p className={styles.sectionTitle}>
                  Select Category <span className={styles.sectionTitleInfo}>(max 3)</span>
                </p>
                <div className={styles.formGridItemScroll}>
                  <FormControl required component="fieldset" className={classes.root}>
                    <FormGroup>
                      {
                        <div className={styles.checkboxContainer}>
                          {subCategories.map((cat, i) => {
                            let catName = cat.name // to captalize values
                            let dis = disable && !subCat.includes(catName) ? true : false
                            let chk = subCat.includes(catName) ? true : false
                            return <FormControlLabel key={i} control={<Checkbox name={catName} size="small" onChange={handleCheckboxChange} disabled={dis} checked={chk} />} label={upCaseFirstLetter(catName)} />
                          })}
                        </div>
                      }
                    </FormGroup>
                  </FormControl>
                </div>
              </div>

              <div className={styles.formGridItem}>
                <p className={styles.sectionTitle}> Select Price</p>
                <FormControl component="fieldset" className={classes.root}>
                  <RadioGroup name="price" value={price} onChange={setPriceRestaurant}>
                    <div className={styles.neighContainer}>
                      {prices.map((p, i) => {
                        return <FormControlLabel key={i} value={p} control={<Radio size="small" />} label={p} />
                      })}
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <span className={styles.submit} onClick={submitFilter}>
              Submit
            </span>
          </Fragment>
        )}
      </div>
    </div>
  )
}
