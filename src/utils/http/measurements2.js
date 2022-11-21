import Axios from "axios";
import { API } from "../Api";

// List of size
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}measurement2?page=${page}&limit=${limit}`,
    header
  );
};

// Store size
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}measurement2`, data, header);
};

// Show size
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}measurement2/${id}`, header);
};

// Edit size
const Edit = async (id, data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.put(`${API}measurement2/${id}`, data, config);
};

// Delete Size
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}measurement2/${id}`, header);
};

const Measurement2 = {
  Index,
  Store,
  Show,
  Edit,
  Delete,
};

export default Measurement2;
