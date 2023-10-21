import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import { motion, AnimatePresence } from "framer-motion";
import Notificatin from "./components/Notificatin";
import Confirmation from "./components/Confirmation";
import user from "./services/users.service";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

function App() {
  const [allUsers, setAllUsers] = useState();
  const [isForm, setisForm] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [isToogle, setIsToogle] = useState(false);
  const [idCard, setIdCard] = useState();
  const [confirmation, setConfirmation] = useState();

  const getAllUsers = useCallback(async () => {
    try {
      const resp = await user.getAll();
      setAllUsers(resp);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  const toggleForm = () => setisForm(!isForm);

  const toggleConfirmation = (id) => {
    setIsToogle(!isToogle);
    setIdCard(id);
    console.log(id);
  };
  console.log(confirmation);

  return (
    <div className="App">
      <div>
        <AnimatePresence>
          {confirmation != undefined ? (
            <Confirmation confirmation={confirmation} item={item} />
          ) : null}
        </AnimatePresence>
      </div>
      <motion.div>
        <AnimatePresence>
          {isToogle && (
            <Notificatin
              idCard={idCard}
              setIsToogle={setIsToogle}
              getAllUsers={getAllUsers}
              item={item}
              setConfirmation={setConfirmation}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <div className="containerTitle">
        <div>
          <h1>Users</h1>
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
            setConfirmation={setConfirmation}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {allUsers && (
          <motion.ul
            layout
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ delay: 1 }}
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
                  toggleConfirmation={toggleConfirmation}
                />
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
