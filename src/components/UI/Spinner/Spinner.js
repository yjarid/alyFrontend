import React from 'react'
import styles from './Spinner.module.scss'

const Spinner = () => {
    return (
        // <div className="container">
        //     <div className="loader">Loading...</div>
        // </div>
        <div className={styles.container}>
            <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div>
        
        
        
    )
}

export default Spinner