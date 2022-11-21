import Axios from "axios";
import { API } from "../Api";

// List of leaf category
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}leaf-category?page=${page}&limit=${limit}`,
    header
  );
};

// Store leaf category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}leaf-category`, data, header);
};

// Delete leaf category
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}leaf-category/${data}`, header);
};

const LeafCategory = {
  Index,
  Store,
  Delete,
};

export default LeafCategory;
