import axios from "axios";
import React from "react";
import { motion } from "framer-motion";

const userCard = ({ user, getAllUsers, setUserInfo, toggleForm, item }) => {


  const deleteUser = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;
    axios
      .delete(URL)
      .then((res) => {
        console.log("user eliminated");
        getAllUsers();
        
      })
      .catch((err) => console.log(err)); 
  };

  const getUser = () => {
    setUserInfo(user);
    toggleForm();
  };

  return (
    <motion.article className="article-card" layout variants={item} initial='hidden' animate='show' whileHover={{ scale: 1.02, transition: {duration: 0.1 }}}   exit="hidden">
      {/* //duration 0.7 agregada como prueba */}
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
        <button className="trash" onClick={deleteUser}>
          <i className="far fa-trash-alt"></i>
        </button>
        <button className="edit" onClick={getUser}>
          
        </button>
      </div>
    </motion.article>
  );
};

export default userCard;
