import Axios from "axios";
import { API } from "../Api";

// List of elements
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}element?page=${page}&limit=${limit}`, header);
};

// Store element
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}element`, data, header);
};

// Search is sub category or leaf category item
const SearchInSubCategoryOrLeafCategory = async (query, type, category_id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}element/search-in-sub-category-or-leaf-category/${type}/${category_id}?query=${query}`,
    header
  );
};

// Make default fabric
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}element/make-default/${data}`, header);
};

// delete element
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}element/${id}`, header);
};

const Element = {
  Index,
  Store,
  Delete,
  SearchInSubCategoryOrLeafCategory,
  MakeDefault,
};

export default Element;
