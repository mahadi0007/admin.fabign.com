import Axios from "axios";
import { API } from "../Api";

// List of category
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}category2?page=${page}&limit=${limit}`, header);
};

// Store category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}category2`, data, header);
};

// Show category
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}category2/${id}`, header);
};

// Update category
const Edit = async (id, data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.put(`${API}category2/${id}`, data, config);
};

// Delete category
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}category2/${data}`, header);
};

const Category2 = {
  Index,
  Store,
  Show,
  Edit,
  Delete,
};

export default Category2;
