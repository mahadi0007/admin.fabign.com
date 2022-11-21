import Axios from "axios";
import { API } from "../Api";

// List of slider
const Index = async (page) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-slider`, header);
};

// Store slider
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}e-slider`, data, header);
};

// Show single slider
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-slider/${id}`, header);
};

// Update slider
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-slider/${id}`, data, header);
};

// Delete slider
const Delete = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}e-slider/delete/${data}`, header);
};

const ESlider = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default ESlider;
