import React,{useState} from 'react';
import './index.css';
import Data from '../../data/data.json';
import Buttons from '../Buttons';
import MotionSection from '../MotionSection';

function Info() {
  const [errors, setErrors] = useState({
    Name:false,
    Email:false,
    Phone:false
  });
  const [value, setValue] = useState({
    Name:'',
    Email:'',
    Phone:""
  })
  const {heading, input, subHeading} = Data['Info'];
  function handleSummaryUpdate() {
    return;
  }
  function handleChange(e){
    setValue({...value, [e.target.name]:e.target.value});
  }
  function handleBlur(e){
    if(value[e.target.name].length === 0){
      setErrors({...errors,[e.target.name]:true});
      return;
    }
    setErrors({...errors, [e.target.name]:false});
  }
  let disabled = (errors.Name || errors.Email || errors.Phone) ;
  return (
    
        <MotionSection className={'info__container'}>
        <h1 className='info__heading'>{heading}</h1>
        <h3 className="info__sub--heading">{subHeading}</h3>
        <form action="" className='info__form'>
          {input.map((item, index)=> <label className={`info__input ${errors[item.field.split(' ')[0]]? 'input--error':''}`} htmlFor={`${item.field.split(' ')[0]}`} key={index}>
            {item.field} <span className={`${errors[item.field.split(' ')[0]]? 'info__form--error':'none'}`}>This field is required</span>
            <input type="text" onChange={handleChange} onBlur={handleBlur} className={`${!errors[item.field.split(' ')[0]]? 'info__input--box':'input__box--error'}`} name={`${item.field.split(' ')[0]}`} id={`${item.field.split(' ')[0]}`} placeholder={item.placeholder} />
          </label>)}
        </form>
        <Buttons handleSummaryUpdate={handleSummaryUpdate} disabled={disabled} />
        </MotionSection>
    
  )
}

export default Info;