import { API } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}colors`, config);
};

const Store = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}colors`, data, config);
};

const Update = async (data, id) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.put(`${API}colors/${id}`, data, config);
};

const Delete = async (uid) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}colors/uid`, config);
};

const Colors = {
  Index,
  Store,
  Update,
  Delete,
};

export default Colors;
