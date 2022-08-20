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
    <motion.article layout variants={item} exit="hidden">
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
          <img src="../public/pencil.png" alt="" />
        </button>
      </div>
    </motion.article>
  );
};

export default userCard;
