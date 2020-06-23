import React from 'react'
import { withFormik , Form,  } from 'formik'
import * as Yup from "yup"

import {MyTextField, MyTextArea, MyButton, MySelect} from '../../../../UI/CustomFields/CustomField'




const LocationForm = (props) =>  {
  const {values} = props

  console.log(props)
  
      return (
          <div>
      
        
          <Form >
            <div >

            <div>
                  <MyTextField disabled={false} name="name" label=" Add name" />
                </div>
           

                <div> 
                  <MyTextArea  multiline rows="4" name="desc" label="Description" /> 
                </div> 

                <div>
                  <MySelect  name="group" label="Select city (only if neighborhood)" option={props.categories}  />
                </div>

                <div>
                 <MySelect  name="cat" label="Select type" option={["buz01", "buz02"]} selected={props.cat || ""}/>
                </div>

                </div>
                     
                  
                <MyButton disabled={props.isSubmitting} type='submit'>Submit</MyButton>
          </Form>      
          
        </div>
      )
  }

 
const LocForm = withFormik({
   enableReinitialize: true,
    mapPropsToValues({  name, neigh , desc, cat, group, lat, lng})  {
      return { 
        name : name || '',
        desc: desc || '',
        cat: cat || '',
        group: group || '',
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('name is required'),
        desc: Yup.string(),
        cat: Yup.string().required('category is required'),
        group: Yup.string(),

    }),

     handleSubmit:  (values, {props,  setSubmitting }) => {
       
        let name = values.name.toLowerCase()
        let group = values.group
        if(values.cat == "buz01") {
          group = name
        }
    

       props.onSubmit({variables: {...values, name, group, id: props.id} })
       setSubmitting(false)
    }
  })(LocationForm)

  export default LocForm
