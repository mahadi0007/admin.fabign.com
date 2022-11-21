import Axios from "axios";
import { API } from "../Api";

// List of fabric
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}fabric?page=${page}&limit=${limit}`, header);
};

// Store fabric
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}fabric`, data, header);
};

// Make default fabric
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}fabric/make-default/${data.id}/${data.category}`,
    header
  );
};

// for deleting fabric
const Delete = async (uid) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}fabric/${uid}`, header);
};

const Fabric = {
  Index,
  Store,
  MakeDefault,
  Delete,
};

export default Fabric;
