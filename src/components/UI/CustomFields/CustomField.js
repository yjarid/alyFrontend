import React from 'react';
import {TextField, Radio, FormControlLabel, Button} from '@material-ui/core'
import { useField, Field, ErrorMessage} from 'formik'
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, makeStyles, MenuItem, FormHelperText  } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));
  

export const MyRadio = ({label, ...props}) => {
    const [field] = useField(props)
    return (
      <FormControlLabel {...field} control={<Radio />} label={label} />
    )
  }

  const styles = {
    root : {
      '& .MuiInputBase-input' : {
        color : 'blue'
      }    
    },
  }
  
  const MyTextFieldPre = props => {
    const {label, disabled,  classes, type} = props
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
      <TextField {...field} 
      className = {classes.root}
      classes={classes}
      disabled={disabled} 
      type={type}
      label={label} 
      helperText={errorText}
      autoComplete="off"
      error={errorText ? true : false}  
      margin="normal"      
      variant="outlined"
      fullWidth
      
      />
    )
}

export const MyTextField = withStyles(styles)(MyTextFieldPre)

export const MyTextArea = props => {
  const {label, rows} = props
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
      <TextField 
      {...field}  
      multiline   
      rows={rows}
      label={label}  
      helperText={errorText} 
      error={errorText ? true : false} 
       margin="normal"      
       variant="outlined"
       fullWidth
       />
    )
}

// Button 

export const MyButton = withStyles({
  root: {
    justifyItems: 'center',
    display : 'block',
    margin :' 0 auto',
    color: '#ffffff',
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
    '&:disabled': {
      backgroundColor: '#000000',
    },
  },
})(Button);


export const MyRating = ({name}) => {
  return <Rating name="rating"/>
}




const MaterialUISelectField = ({
  errorString,
  children,
  value,
  name,
  label,
  onChange,
  onBlur,
 }) => {
  return (
    <FormControl fullWidth>
      <InputLabel >{label}</InputLabel>
      <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  );
};




export const MySelect  = (props) => {
  const {option, name, label} = props

  return (
    <div >
      <Field
        name={name}
        as={MaterialUISelectField}
        label={label}
        errorString={<ErrorMessage name={name} />}
      
      >
        <MenuItem  value={""}>
            {"None"}
          </MenuItem>
        {option.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Field>
    </div>
  )

  
  }

 