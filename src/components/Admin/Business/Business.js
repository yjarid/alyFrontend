import React, { useState, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {GET_BUSINESSES} from '../../../qraphQl/businessType'
import PreviewBus from '../Business/PreviewBus/PreviewBus'
import styles from './Business.module.scss'


function Business(props) {

    const [index , setIndex] = useState(0)

    const {data} = useQuery(GET_BUSINESSES , {variables: {published : false}} )
      console.log(data)

      const setBusIndex = (i) => {
          setIndex(i)
      }
  
    return (
        <div className={styles.container}>
            {typeof data != "undefined" && (
                <Fragment>
                    <div className={styles.busList}>
                        {data.businesses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((bus, i) => <p key={i} className={styles.busItem} onClick={()=>setBusIndex(i)}>{bus.name}</p>)}
                    </div>
                    <div>
                        <PreviewBus bus={data.businesses[index]} />
                    </div>
                </Fragment>
                )
        }
        </div>
    )
}

export default Business
