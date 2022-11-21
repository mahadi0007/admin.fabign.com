import Axios from "axios";
import { API } from "../Api";

// List of button
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}button?page=${page}&limit=${limit}`, header);
};

// Store button
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}button`, data, header);
};

// Make default button
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}button/make-default/${data.id}/${data.category}`,
    header
  );
};

// for deleting button
const Delete = async (uid) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}button/${uid}`, header);
};

const Button = {
  Index,
  Store,
  Delete,
  MakeDefault,
};

export default Button;
