import Axios from "axios";
import { API } from "../Api";

// List of cft-input
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}cft-input?page=${page}&limit=${limit}`, header);
};

// Store cft-input
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}cft-input`, data, header);
};

// Show single cft-status
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}cft-input/${id}`, header);
};

// Update cft-status
const Update = async (id, data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}cft-input/${id}`, data, header);
};

// Delete cft-input
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}cft-input/delete/${id}`, header);
};

const CFTInput = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default CFTInput;
