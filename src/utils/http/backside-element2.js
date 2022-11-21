import Axios from "axios";
import { API } from "../Api";

// List of elements
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}backside-element2?page=${page}&limit=${limit}`,
    header
  );
};

// Store element
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}backside-element2`, data, header);
};

// Show single element
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}backside-element2/${id}`, header);
};

// Update element
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}backside-element2/${id}`, data, header);
};

// Make default fabric
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}backside-element2`, data, header);
};

// Delete Element
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}backside-element2/${id}`, header);
};

const BacksideElement2 = {
  Index,
  Store,
  Show,
  Update,
  MakeDefault,
  Delete,
};

export default BacksideElement2;
