import React, { Children } from 'react'
import{motion, AnimatePresence} from 'framer-motion';
function MotionSection({children,className}) {
  return (
    <AnimatePresence>
    <motion.section className={className} initial ={{x:'100%', opacity:0}} animate={{x:0, opacity:1}} exit={{x:'-100%', opacity:0}} transition={{duration:0.3}}>
        {
            children
        }
        </motion.section>
        </AnimatePresence>
  )
}

export default MotionSection