import React, { useState, useEffect, useCallback, useContext } from "react"
import useClapAnimation from "./useClapAnimation"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_IMAGE } from "../../../qraphQl/imageType"
import { UPDATE_REVIEW } from "../../../qraphQl/reviewType"
import styles from "./Clap.module.scss"
import { DispatchContext } from "../../../Context"
import { loginRequired } from "../../../AccessToken"

const MAXIMUM_USER_CLAP = 5

const MediumClap = ({ claps, id, type }) => {
  const appDispatch = useContext(DispatchContext)
  const [clapState, setClapState] = useState({
    count: 0,
    countTotal: claps,
    isClicked: false
  })
  const { count, countTotal, isClicked } = clapState

  const [disableBtn, setDisableBtn] = useState(false)
  const [sendDataCount, setSendDataCount] = useState(0)
  const [stateError, setStateError] = useState(null)

  const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({})

  const graphQlQuery = type == "review" ? UPDATE_REVIEW : UPDATE_IMAGE

  const [updateClaps, { data, error, loading }] = useMutation(graphQlQuery, {
    onError(error) {
      setStateError(`${error.message.replace("GraphQL error:", "")}`)
      setClapState(prevState => ({
        isClicked: false,
        count: 0,
        countTotal: claps
      }))
    }
  })

  useEffect(() => {
    if (data) {
      const claps = type == "review" ? data.updateReview.claps : data.updateImage.claps

      setClapState({
        isClicked: false,
        count: 0,
        countTotal: claps
      })
    }
  }, [data])

  useEffect(() => {
    setStateError(null)
    setClapState({
      isClicked: false,
      count: 0,
      countTotal: claps
    })
  }, [id])

  useEffect(() => {
    if (sendDataCount) {
      const delay = setTimeout(() => updateClaps({ variables: { id, claps: count } }), 2000)

      return () => clearTimeout(delay)
    }
  }, [sendDataCount])

  const setRef = useCallback(node => {
    setRefState(prevRefState => ({
      ...prevRefState,
      [node.dataset.refkey]: node
    }))
  }, [])

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef
  })

  const handleClapClick = () => {
    let isLoged = loginRequired(null, appDispatch)
    if (count < MAXIMUM_USER_CLAP && isLoged) {
      animationTimeline.replay()
      setClapState(prevState => ({
        isClicked: true,
        count: prevState.count + 1,
        countTotal: prevState.countTotal ? prevState.countTotal + 1 : 1
      }))

      setSendDataCount(prev => prev + 1)
    }
  }

  return (
    <>
      <div className={styles.clapContainer}>
        <button ref={setRef} data-refkey="clapRef" className={styles.clap} onClick={handleClapClick} disabled={disableBtn}>
          <ClapIcon isClicked={isClicked} />
          <ClapCount count={count} setRef={setRef} />
          <CountTotal countTotal={countTotal} setRef={setRef} />
        </button>
        {!isClicked && <div className={styles.initialTot}>{countTotal}</div>}
      </div>
      {stateError && <div className={styles.error}>{stateError}</div>}
    </>
  )
}

/**
 * subcomponents
 */

const ClapIcon = ({ isClicked }) => {
  return (
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-549 338 100.1 125" className={`${styles.icon} ${isClicked && styles.checked}`}>
        <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
        <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
      </svg>
    </span>
  )
}
const ClapCount = ({ count, setRef }) => {
  return (
    <span ref={setRef} data-refkey="clapCountRef" className={styles.count}>
      + {count}
    </span>
  )
}

const CountTotal = ({ countTotal, setRef }) => {
  return (
    <span ref={setRef} data-refkey="clapTotalRef" className={styles.total}>
      {countTotal}
    </span>
  )
}

export default MediumClap
