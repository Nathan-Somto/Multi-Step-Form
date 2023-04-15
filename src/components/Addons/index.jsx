import React,{useState,useRef,useEffect} from 'react'
import Data from "../../data/data.json";
import {useAppContext} from '../../App';
import { handleFormat, updateStorage } from '../../utils';
import checkMark from '../../assets/images/icon-checkmark.svg';
import Buttons from '../Buttons';
import "./index.css";
import MotionSection from '../MotionSection';
import  MotionDiv, {child} from '../MotionDiv';
import {motion} from 'framer-motion';
function Addons() {
  const [active, setActive] = useState({});
  let addons = useRef([]);
  const{time,dispatch} = useAppContext();
  const {heading, subHeading,card} = Data["Addons"];
  useEffect(()=>{
    let localAddons = localStorage.getItem("addons");
    if(localAddons !== null){
      let parsedAddons = JSON.parse(localAddons);
      let keys =Object.keys(parsedAddons);
      keys.forEach((item,index)=>{
        if(parsedAddons[item]){
          let {Price, Time} = handleFormat([card[item].month,card[item].year],time);
        addons.current.push({title: card[item].title,price:Price, time:Time});
        }
      })
      setActive(parsedAddons);
    }
  },[]);
  
  
  function handleSelect(index, title, price){
   
    if(active[index]){
     
      addons.current = addons.current.length ? addons.current.filter((item)=> item.title !== title) : addons.current;
      setActive({...active,[index]:false});
      return;
    }
   const { Price, Time}= handleFormat(price,time);
    addons.current.push({title, price:Price, time:Time});
    setActive({...active, [index]:true});
   
  }
  function handleSummaryUpdate(){
    updateStorage('addons',active);
    dispatch({type:"addons",payload:addons.current})
  }
  return (
    <MotionSection className={'addons__container'}>
      <h1 className='addons__heading'>{heading}</h1>
      <h3 className='addons__sub--heading'>{subHeading}</h3>
      <MotionDiv className={"addons__check"}>
        {
          card.map((item, index)=> <motion.div key={index} variants={child} className={`addons__check--container ${active[index.toString()] ? 'check--active':""}`}>
            <div className='addons__check--box' onClick={()=>handleSelect(index.toString(),item.title,[item.month,item.year])}>
              <span>
                <img src={checkMark} alt ="check mark"/>
              </span>
            </div>
              <div className='addons__check--text'>
                <h2 className="addons__check--title">{item.title}</h2>
                <h3 className="addons__check--subtitle">{item.subTitle}</h3>
              </div>
              <div> <p className="addons__check--time">{`+$${time === 'month' ? `${item.month}/mo`:`${item.year}/yr`}`}</p> </div>
           
          </motion.div>)
        }

      </MotionDiv>
       <Buttons handleSummaryUpdate={handleSummaryUpdate} disabled ={false}/>
       </MotionSection>
  )
}

export default Addons