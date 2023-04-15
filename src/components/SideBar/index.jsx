import React from 'react'
import './index.css';
import data from '../../data/data.json';
import { useAppContext } from '../../App';
import {motion} from 'framer-motion';

function Sidebar() {
  const {page} = useAppContext();
  const container = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition:{
        staggerChildren:0.2,
        delayChildren:0.6,
        duration:0.4}
    }
  }
  const row ={
    hidden:{
      opacity: 0
    },
    show:{
      opacity:[0,0,0,0.5,0.5,0.7,1],
      transition:{
        duration: 0.35
      }
    }
  }
  return (
    <motion.aside className='sidebar__container' initial={'hidden'} variants={container} animate={'show'}>
     {data["Sidebar"].map((item, index)=> <motion.div variants={row}  className="sidebar__row--container" key={`step-${index}`}>
        <div  className={`sidebar__btn ${page === +item.step? 'active':''}`}>{item.step}</div>
      <div className="sidebar__text--container">
        <h4 className='sidebar__text--heading'>{`Step ${item.step}`}</h4>
        <p className="sidebar__text--paragraph">{item.paragraph}</p>
      </div>
    </motion.div>
     )
    }
    </motion.aside>
  )
}

export default Sidebar