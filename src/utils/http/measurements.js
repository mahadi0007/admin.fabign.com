import Axios from "axios";
import { API } from "../Api";

// List of size
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}measurement?page=${page}&limit=${limit}`,
    header
  );
};

// Store size
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}measurement`, data, header);
};

// Show size
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}measurement/${id}`, header);
};

// Delete Size
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}measurement/${id}`, header);
};

const Measurement = {
  Index,
  Store,
  Show,
  Delete,
};

export default Measurement;
