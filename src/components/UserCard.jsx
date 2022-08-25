import axios from "axios";
import React, { useState } from "react";
import { motion, transform } from "framer-motion";
import Statuscard from "./Statuscard";

const userCard = ({ user, toggleConfirmation, setUserInfo, toggleForm, item,  }) => {

 


  const getUser = () => {
    setUserInfo(user);
    toggleForm();
  };


  return (
    <motion.article className="article-card"  variants={item} whileHover={{
      scale: 1.02,
      transition: { duration: 0.1 },
    }} layout>
      {/* //duration 0.7 agregada como prueba */}
      <div className="card__id">
        <p>#{user.id}</p>
      </div>
      <div>
        <h4>
          {user.first_name} {user.last_name}
        </h4>
      </div>
      <hr />
      <span>CORREO</span>
      <p>{user.email}</p>
      <span>CUMPLEAÑOS</span>
      <p>{user.birthday}</p>
      <hr />
      <div className="buttonsContainer">
        <button className="trash" onClick={() => toggleConfirmation(user.id)}>
          <i className="far fa-trash-alt"></i>
        </button>
        <button className="edit" onClick={getUser}>
          
        </button>
      </div>
    </motion.article>
  );
};

export default userCard;
