import Axios from "axios";
import { API } from "../Api";

// List of brand
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-brand?page=${page}&limit=${limit}`, header);
};

// Store brand
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}e-brand`, data, header);
};

// Show single brand
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-brand/${id}`, header);
};

// Update brand
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-brand/${id}`, data, header);
};

// Delete brand
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}e-brand/${id}`, header);
};

const EBrand = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default EBrand;
