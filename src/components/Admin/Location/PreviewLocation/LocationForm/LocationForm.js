import React from 'react'
import { withFormik , Form, FieldArray, Field } from 'formik'
import * as Yup from "yup"

import {MyTextField, MyTextArea, MyButton, MySelect} from '../../../../UI/CustomFields/CustomField'




const LocationForm = (props) =>  {
  const {values, setFieldValue} = props

  console.log(props)
  
      return (
          <div>
      
        
          <Form >
            <div >

            <div>
                  <MyTextField disabled={false} name="name" label=" Add name (only when creating city)" />
                </div>
           
                <div>
                  <MyTextField disabled={true} name="neigh" label=" Neighborhood" />
                </div>

                <div> 
                  <MyTextArea  multiline rows="4" name="desc" label="Description" /> 
                </div> 

                <div>
                  <MySelect  name="group" label="Select city (only if neighborhood)" option={props.cities}  />
                </div>

                <div>
                 <MySelect  name="cat" label="Select type" option={["city", "neighborhood"]} selected={props.cat || ""}/>
                </div>

                <div>
                  <MyTextField disabled={false} name="lat" label="Latitude"/>
                </div>

                <div>
                  <MyTextField disabled={false} name="lng" label="Longitude"/>
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
        neigh: neigh || '',
        desc: desc || '',
        cat: cat || '',
        group: group || '',
        lat: lat  || '',
        lng: lng || '',

      }
    },
    validationSchema: Yup.object().shape({
        desc: Yup.string(),
        neigh: Yup.string(),
        cat: Yup.string().required('category is required'),
        group: Yup.string(),
        lat: Yup.string().required('Latitude is required'),
        lng: Yup.string().required('longitude is required')
    }),

     handleSubmit:  (values, {props,  setSubmitting }) => {
       let name = values.name.toLowerCase().trim()
       let group = values.group
       let neigh = null
      if(values.cat == "city") {
        neigh = name
        group = name
      } else {
        neigh = group.concat(" ", name.toLowerCase())
      }

      let lat = values.lat.toString()
      let lng = values.lng.toString()

      
       props.onSubmit({variables: {...values, name, neigh, group, lat, lng,   id: props.id} })
       setSubmitting(false)
    }
  })(LocationForm)

  export default LocForm
