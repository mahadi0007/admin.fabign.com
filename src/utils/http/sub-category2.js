import Axios from "axios";
import { API } from "../Api";

// List of sub category
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}sub-category2?page=${page}&limit=${limit}`,
    header
  );
};

// Store sub category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}sub-category2`, data, header);
};

// Show sub category
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}sub-category2/${id}`, header);
};

// Edit sub category
const Edit = async (id, data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.put(`${API}sub-category2/${id}`, data, config);
};

// Delete sub category
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}sub-category2/${data}`, header);
};

const SubCategory2 = {
  Index,
  Store,
  Show,
  Edit,
  Delete,
};

export default SubCategory2;
