import axios from "axios";
import React from "react";
import {motion} from 'framer-motion'

const Notificatin = ({ idCard, setIsToogle,getAllUsers, item }) => {

  const deleteUser = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${idCard}/`;
    axios
      .delete(URL)
      .then((res) => {
        console.log("user eliminated");
        getAllUsers();
      })
      .catch((err) => console.log(err))
      .finally(setIsToogle(false));
      
  };

  return (
    <motion.div initial='hidden' variants={item} animate='show' exit='hidden' className="container__notification">
      <div className="notification">
        <div className="warning__container">
          <img className="warning" src="/warning.png" alt="" />
        </div>
        <div>
          <p>
            do you want to delete user number <span>{idCard}</span>?
          </p>
        </div>
        <div className="warning__buttons">
          <motion.button className="trash" whileTap={{scale: 0.97}} onClick={deleteUser}>Yes</motion.button>
          <motion.button className="no" whileTap={{scale: 0.97}} onClick={() => setIsToogle(false)}>No</motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Notificatin;
