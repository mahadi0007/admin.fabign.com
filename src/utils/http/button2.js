import Axios from "axios";
import { API } from "../Api";

// List of button2
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}button2?page=${page}&limit=${limit}`, header);
};

// Store button2
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}button2`, data, header);
};

// Show button2
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}button2/${id}`, header);
};

// Update button2
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}button2/${id}`, data, header);
};

// Make default button2
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}button2/make-default/${data.id}/${data.category}`,
    header
  );
};

// for deleting button2
const Delete = async (uid) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}button2/${uid}`, header);
};

const Button2 = {
  Index,
  Store,
  Show,
  Update,
  Delete,
  MakeDefault,
};

export default Button2;
