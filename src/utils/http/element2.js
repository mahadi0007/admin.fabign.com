import Axios from "axios";
import { API } from "../Api";

// List of elements
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}element2?page=${page}&limit=${limit}`, header);
};

// Store element2
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}element2`, data, header);
};

// Show single element2
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}element2/${id}`, header);
};

// Update element
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}element2/${id}`, data, header);
};

// Search is sub category item
const SearchInSubCategory = async (query, category_id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}element2/search-in-sub-category/${category_id}?query=${query}`,
    header
  );
};

// Make default fabric
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}element2/make-default/${data}`, header);
};

// delete element2
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}element2/${id}`, header);
};

const Element2 = {
  Index,
  Store,
  Show,
  Update,
  SearchInSubCategory,
  Delete,
  MakeDefault,
};

export default Element2;
