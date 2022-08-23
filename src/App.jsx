import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [allUsers, setAllUsers] = useState();
  const [isForm, setisForm] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const getAllUsers = () => {
    const URL = "https://users-crud1.herokuapp.com/users/";
    axios
      .get(URL)
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const toggleForm = () => setisForm(!isForm);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },

  };

  return (
    <div className="App">
      <div className="containerTitle">
        <div>
          {" "}
          <h2>Users</h2>
        </div>
        <div>
          <button className="addUser" onClick={toggleForm}>
            + create a new user
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isForm && (
          <UserForm
            getAllUsers={getAllUsers}
            toggleForm={toggleForm}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setisForm={setisForm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {allUsers && (
          <motion.div
            layout
            variants={container}
            initial="hidden"
            animate="show"
            className="containerUsers"
          >
            {allUsers
              .sort((userFirst, usersecond) =>
                userFirst.id > usersecond.id ? 1 : -1
              )
              .map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  getAllUsers={getAllUsers}
                  setUserInfo={setUserInfo}
                  toggleForm={toggleForm}
                  item={item}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
