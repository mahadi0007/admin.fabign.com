import Axios from "axios";
import { API } from "../Api";

// List of sub category
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}sub-category?page=${page}&limit=${limit}`,
    header
  );
};

// Store sub category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}sub-category`, data, header);
};

// Show sub category
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}sub-category/${id}`, header);
};

// Delete sub category
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}sub-category/${data}`, header);
};

const SubCategory = {
  Index,
  Store,
  Show,
  Delete,
};

export default SubCategory;
