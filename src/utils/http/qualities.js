import { API } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}qualities`, config);
};

const Store = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}qualities`, data, config);
};

const Update = async (data, id) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.put(`${API}qualities/${id}`, data, config);
};

const Delete = async (uid) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}qualities/uid`, config);
};

const Qualities = {
  Index,
  Store,
  Update,
  Delete,
};

export default Qualities;
