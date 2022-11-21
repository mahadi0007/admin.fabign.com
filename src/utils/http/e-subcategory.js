import Axios from "axios";
import { API } from "../Api";

// List of brand
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}e-sub-category/?page=${page}&limit=${limit}`,
    header
  );
};

// Store subcategory
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}e-sub-category/`, data, header);
};

// Show single subcategory
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-sub-category/${id}`, header);
};

// Udapte subcategory
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-sub-category/${id}`, data, header);
};

// Delete subcategory
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}e-sub-category/${id}`, header);
};

const ESubCategory = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default ESubCategory;
