import Axios from "axios";
import { API } from "../Api";

// List of size
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}profile?page=${page}&limit=${limit}`, header);
};

// Show single size
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}profile/${id}`, header);
};

// Show size
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}profile/${id}`, header);
};

const Size = {
  Index,
  Show,
  Delete,
};

export default Size;
