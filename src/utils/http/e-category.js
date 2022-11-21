import Axios from "axios";
import { API } from "../Api";

// List of brand
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}e-category/?page=${page}&limit=${limit}`,
    header
  );
};

// Store Category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}e-category/`, data, header);
};

// Show single category
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-category/${id}`, header);
};

// Udapte category
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-category/${id}`, data, header);
};

// Delete category
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}e-category/${id}`, header);
};

const ECategory = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default ECategory;
