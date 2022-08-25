import React from 'react'
import {motion} from 'framer-motion'

const Confirmation = ({confirmation, item}) => {
  return (
    <motion.div className='confirmation' initial='hidden' variants={item} animate='show' exit='hidden' >
        <div className='confirmation__toogle'>
            <div className={`checked__container ${confirmation[0]}`}>
                <img className='checked' src="./checked.png" alt="" />
            </div>
            <p>{confirmation[1]}</p>
        </div>
    </motion.div>
  )
}

export default Confirmation