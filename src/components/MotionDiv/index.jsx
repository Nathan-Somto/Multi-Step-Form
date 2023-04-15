import React from 'react'
import {motion} from 'framer-motion';
const container ={
    hidden:{
        opacity:0
    },
    show:{
        opacity:1,
        transition:{
            delay:0.5,
            delayChildren:0.2,
            staggerChildren: 0.5
        }
    }
}
export const child ={
    hidden: {
        scale :0,
        opacity:0
    },
    show:{
        scale: [0,0.5,1]
        ,opacity:1
    }
}
function MotionDiv({children,className}) {
  return (
    <motion.div className={className} variants={container} initial={'hidden'} animate={'show'}>
        {children}
    </motion.div>
  )
}

export default MotionDiv