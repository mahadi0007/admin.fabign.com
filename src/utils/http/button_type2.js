import Axios from "axios";
import { API } from "../Api";

// List of button-type2
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}button-type2?page=${page}&limit=${limit}`,
    header
  );
};

// Store button-type2
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}button-type2`, data, header);
};

// Show single button-type2
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}button-type2/${id}`, header);
};

// Update button-type2
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}button-type2/${id}`, data, header);
};

const ButtonType2 = {
  Index,
  Store,
  Show,
  Update,
};

export default ButtonType2;
