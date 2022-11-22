import Axios from "axios";
import { API } from "../Api";

// Search admin
const Admin = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/admin?query=${data}`, header);
};

// Search user
const User = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/user?query=${data}`, header);
};

const Search = {
  Admin,
  User,
};

export default Search;
