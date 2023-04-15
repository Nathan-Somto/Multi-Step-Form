import React from 'react'
import Message from '../Message';
import Info from '../Info';
import Plans from '../Plans';
import Addons from '../Addons';
import Summary from '../Summary';
import { useAppContext } from '../../App';
import './index.css';
function Center() {
 const {page} =useAppContext();
  function StepPage(){
    switch(page){
      case 0:
        return <Message/>
      case 1:
       return  <Info/>;
      case 2:
       return  <Plans/>;
      case 3:
        return <Addons/>;
      case 4:
        return <Summary/>;
      default:
      return  <div>I will never show</div>;


    }
  }
  return (
    
   <main className='center__container'>
  {StepPage()}
   </main>
  )
}

export default Center