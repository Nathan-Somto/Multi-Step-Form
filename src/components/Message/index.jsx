import React from 'react'
import Data from '../../data/data.json';
import thankYou from '../../assets/images/icon-thank-you.svg';
import {motion} from 'framer-motion';
import './index.css';
function Message() {
  const{title,paragraph} = Data['Message'];
  return (
    <motion.section className='message__container' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.3,ease:[0.25, 0.45,0.55,0.65]}}>
        <figure className="message__image">
          <img src={thankYou} alt="thank you svg" srcset="" />
        </figure>
        <h2 className='message__title'>{title}</h2>
        <p className='message__paragraph'>{paragraph}</p>
    </motion.section>
  )
}

export default Message;