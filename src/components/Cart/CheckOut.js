import classes from'./checkout.module.css'
import { useRef,useState } from 'react'
import { isContentEditable } from '@testing-library/user-event/dist/utils';
 const isEmpty=value=>value.trim()==='';
 const isFourChars=value=>value.trim().length === 5
const CheckOut=props=> {
    const [formInputValdity,setFormInputValdity]=useState({
  name:true,
  street:true,
  postalCode:true,
  city:true
    })
    const nameInputRef=useRef()
    const streetInputRef=useRef()
    const postalCodeInputRef=useRef()
    const cityInputRef=useRef()
    const confirmHandler=(e)=>{
    e.preventDefault()
    const enterdName=nameInputRef.current.value;
    const enterdStreet=streetInputRef.current.value;
    const enterdPostalCode=postalCodeInputRef.current.value;
    const enterdCity=cityInputRef.current.value;

    const enterdNameIsValid=!isEmpty(enterdName)
    const enterdStreetIsValid=!isEmpty(enterdStreet)
    const enterdCityIsValid=!isEmpty(enterdCity)
    const enterdPostalCodeIsValid=isFourChars(enterdPostalCode)


    setFormInputValdity({
        name:enterdNameIsValid,
        street:enterdStreetIsValid,
        postalCode:enterdPostalCodeIsValid,
        city:enterdCityIsValid
    })

    const formIsValid=enterdNameIsValid &&
    enterdStreetIsValid &&
    enterdCityIsValid &&
    enterdPostalCodeIsValid
    if(!formIsValid){
      return;
    }

    props.onConfrim({
        name:enterdName,
        street:enterdStreet,
        city:enterdCity,
        postalCode:enterdPostalCode
    })
    }
    const inputNameClasses=`${classes.control} ${formInputValdity.name?'':classes.invalid}`
    const inputstreetClasses=`${classes.control} ${formInputValdity.street?'':classes.invalid}`
    const inputpostalClasses=`${classes.control} ${formInputValdity.postalCode?'':classes.invalid}`
    const inputcityClasses=`${classes.control} ${formInputValdity.city?'':classes.invalid}`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
    <div className={inputNameClasses}>
      <label htmlFor='name'>Your Name</label>
      <input type='text' id='name' ref={nameInputRef} />
      {!formInputValdity.name&&<p>please enter a valid name</p>}
    </div>
    <div className={inputstreetClasses}>
      <label htmlFor='street'>Street</label>
      <input type='text' id='street' ref={streetInputRef}/>
      {!formInputValdity.street&&<p>please enter a valid street</p>}
    </div>
    <div className={inputpostalClasses}>
      <label htmlFor='postal'>Postal Code</label>
      <input type='text' id='postal' ref={postalCodeInputRef} />
      {!formInputValdity.postalCode&&<p>please enter a valid PostalCode</p>}
    </div>
    <div className={inputcityClasses}>
      <label htmlFor='city'>City</label>
      <input type='text' id='city' ref={cityInputRef} />
      {!formInputValdity.city&&<p>please enter a valid city</p>}
    </div>
    <div className={classes.actions}>
      <button type='button' onClick={props.onCancel}>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div>
  </form>

  )
}

export default CheckOut