import Axios from "axios";
import { API } from "../Api";

// List of elements
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}backside-element?page=${page}&limit=${limit}`,
    header
  );
};

// Store element
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}backside-element`, data, header);
};

// Make default fabric
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}backside-element`, data, header);
};

// Delete Element
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}backside-element/${id}`, header);
};

const BacksideElement = {
  Index,
  Store,
  MakeDefault,
  Delete,
  // SearchInSubCategoryOrLeafCategory,
  // MakeDefault
};

export default BacksideElement;
