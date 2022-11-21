import Axios from "axios";
import { API } from "../Api";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(`${API}e-banner`, config);
};

const Update = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.put(`${API}e-banner/${id}`, data, config);
};

const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.post(`${API}e-banner`, data, config);
};

// Show single banner
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-banner/${id}`, header);
};

// Delete banner
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}e-banner/delete/${data}`, header);
};

const EBanner = {
  Index,
  Update,
  Store,
  Show,
  Delete,
};

export default EBanner;
