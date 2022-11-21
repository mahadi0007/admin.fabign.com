import Axios from "axios";
import { API } from "../Api";

// List of variation
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}variation?page=${page}&limit=${limit}`, header);
};

// Store variation
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}variation`, data, header);
};

// Show single variation
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}variation/${id}`, header);
};

// Update variation
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}variation/${id}`, data, header);
};

// Delete category
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}variation/delete/${id}`, header);
};

const Variation = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default Variation;
