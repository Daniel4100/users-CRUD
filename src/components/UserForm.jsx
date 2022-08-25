import axios from "axios";
import { MotionConfig } from "framer-motion";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birthday: "",
};


const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }, 
  

}

const UserForm = ({ getAllUsers, toggleForm, userInfo, setUserInfo, setConfirmation }) => {
  const { register, handleSubmit, reset } = useForm();

  const createUser = (data) => {
    if (data) {
      const URL = "https://users-crud1.herokuapp.com/users/";
      axios
        .post(URL, data)
        .then((res) => {
          getAllUsers();
          console.log(res + "new user sucefull");
          setConfirmation(['green', 'added user'])
          setTimeout(() => {
            setConfirmation(undefined)
          }, 2000);
        })
        .catch((err) => console.log(err))
        .finally(reset(defaultValues), toggleForm());
    }
  };
  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [userInfo]);

  const updateUser = (data) => {
    if (userInfo) {
      const URL = `https://users-crud1.herokuapp.com/users/${userInfo.id}/`;
      axios
        .patch(URL, data)
        .then((res) => {
          getAllUsers();
          console.log(res + "update Sucefull");
          setConfirmation(['purple', 'updated user'])
          setTimeout(() => {
            setConfirmation(undefined)
          }, 2000);
        })
        .catch((err) => console.log(err))
        .finally(setUserInfo(undefined), toggleForm());
    }
  };

  const resetForm = () => {
    setUserInfo(undefined);
    reset(defaultValues);
    toggleForm();
  };
  console.log(defaultValues);

  return (
    <motion.div  initial='hidden' variants={item} animate='show' exit='hidden' className="containerForm" >
    <div  className="form">
      <div className="formBox1">
        <p className="black">
          {
            userInfo ? 'Edit User' : 'New User'
          }
        </p>
      </div>
      <div className="formBox2">
        <form className="formForm" onSubmit={handleSubmit(userInfo ? updateUser : createUser)}>
        <input
          type="text"
          placeholder="First name"
          maxLength={15}
          {...register("first_name")}
        />
        <input type="text" placeholder="Last Name" maxLength={15} {...register("last_name")} />
        <input type="email" placeholder="Email" maxLength={30} {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input type="date" {...register("birthday")} />
        <button className="bgBlue">{userInfo ? "Update" : "Create"}</button>
        {userInfo && <button onClick={resetForm}>cancel</button>}
      </form>
      </div>
      
      <button className="close" onClick={resetForm}><i className="fas fa-times"></i></button>
    </div>
    </motion.div>
  );
};

export default UserForm;
