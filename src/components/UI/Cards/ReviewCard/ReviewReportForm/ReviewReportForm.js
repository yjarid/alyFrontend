import React, {useState} from 'react'
import styles from './ReviewReportForm.module.scss'
import { useMutation } from '@apollo/react-hooks'
import {CREATE_REVREPORT} from '../../../../../qraphQl/revStatType'
import FlashMessage from '../../../FlashMessage/FlashMessage'

const ReviewReportForm = ({reviewId}) => {

    const [isSubmiting, setIsSubmiting] = useState(false)
    const [flash, setFlash] = useState({message: null, type: null})
    const [desc, setDesc] = useState('explain why review is inapropriate')

    const [createRevReport, {loading}] = useMutation(
        CREATE_REVREPORT,
        {
          onCompleted({updateImage}) {
            setIsSubmiting(false)
            setFlash({message:'Thank you we will check the review' , type: 'sucess'})
          },
          onError(error) {
              let errMsg = error.message.replace('GraphQL error:', '')
            setFlash({message: errMsg , type: 'error'})
          }
        })

    const descChange = (e)=> {
        setFlash({message:null , type: null})
        let val = e.target.value
        setDesc(e.target.value)
    }

    const submitDesc = () => {
        if(isSubmiting) {
            return
        }
        setIsSubmiting(true)
        let length = desc.length

        if(length == 0) {
            setFlash({message:`Please explain why` , type: 'error'})
            setIsSubmiting(false) 
        }

        else if(desc && length > 100 ){
            setFlash({message:`Do not exceed 100 letters you are at ${length}` , type: 'error'})  
            setIsSubmiting(false)

        } 

        else {
            createRevReport({variables: {
                id: reviewId, report: desc}
             })
        }  
    }

    return(
        <div className={styles.mainContainer}>
            <div>
              <textarea className={styles.textAreaDesc} onChange={descChange} value={desc}  />
            </div>
            <span className={styles.btnDesc} onClick={submitDesc}>Submit</span>
            {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
        </div>
    )
}

export default ReviewReportForm