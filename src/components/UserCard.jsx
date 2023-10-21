import { motion } from "framer-motion";
import { EditIcon, TrashIcon } from "./shared/icons";

const userCard = ({
  user,
  toggleConfirmation,
  setUserInfo,
  toggleForm,
  item,
}) => {
  const getUser = () => {
    setUserInfo(user);
    toggleForm();
  };

  return (
    <motion.li
      className="article-card"
      variants={item}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.1 },
      }}
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
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
        <button className="trash action_button" onClick={() => toggleConfirmation(user.id)}>
          <TrashIcon />
        </button>
        <button className="edit action_button" onClick={getUser}>
          <EditIcon/>
        </button>
      </div>
    </motion.li>
  );
};

export default userCard;
