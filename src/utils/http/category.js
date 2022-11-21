import Axios from "axios";
import { API } from "../Api";

// List of category
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}category?page=${page}&limit=${limit}`, header);
};

// Store category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}category`, data, header);
};

// Show category
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}category/${id}`, header);
};

// Delete category
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}category/${data}`, header);
};

const Category = {
  Index,
  Store,
  Show,
  Delete,
};

export default Category;
