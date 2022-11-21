import Axios from "axios";
import { API } from "../Api";

// List of fabric2
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}fabric2?page=${page}&limit=${limit}`, header);
};

// Store fabric2
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}fabric2`, data, header);
};

// Show single fabric2
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}fabric2/${id}`, header);
};

// Update fabric2
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}fabric2/${id}`, data, header);
};

// Make default fabric2
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}fabric2/make-default/${data.id}/${data.category}`,
    header
  );
};

// for deleting fabric2
const Delete = async (uid) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}fabric2/${uid}`, header);
};

const Fabric2 = {
  Index,
  Store,
  Show,
  Update,
  MakeDefault,
  Delete,
};

export default Fabric2;
