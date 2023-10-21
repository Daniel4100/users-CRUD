import { data } from "../mock/users_data";

const user = {
  getAll: async () => {
    // const URL = "https://users-crud1.herokuapp.com/users/";
    //simular llamada al EP 
    const resp = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 3000);
    });
    return resp
  },
};

export default user