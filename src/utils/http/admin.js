import Axios from "axios";
import { API } from "../Api";

// List of items
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}admin?page=${page}&limit=${limit}`, header);
};

// Store item
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}admin`, data, header);
};

// Show item
const Show = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}admin/${data}`, header);
};

// Edit item
const Edit = async (id, data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.put(`${API}admin/${id}`, data, config);
};

// Delete item
const Delete = async (id) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.delete(`${API}admin/${id}`, config);
};

const Admin = {
  Index,
  Store,
  Show,
  Edit,
  Delete,
};

export default Admin;
