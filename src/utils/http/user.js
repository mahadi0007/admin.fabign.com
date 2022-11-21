import Axios from "axios";
import { API } from "../Api";

// List of items
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}user?page=${page}&limit=${limit}`, header);
};

// Store item
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}user`, data, header);
};

// Show item
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}user/${id}`, header);
};

// Edit item
const Edit = async (id, data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.put(`${API}user/${id}`, data, config);
};

// Delete item
const Delete = async (id) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.delete(`${API}user/${id}`, config);
};

const User = {
  Index,
  Store,
  Show,
  Edit,
  Delete,
};

export default User;
