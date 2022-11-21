import Axios from "axios";
import { API } from "../Api";

const Index = async (page, limit) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(
    `${API}e-additional-info?page=${page}&limit=${limit}`,
    config
  );
};

const Delete = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}e-additional-info/delete/${id}`, config);
};

const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}e-additional-info`, data, config);
};

const Edit = async (id, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.put(`${API}e-additional-info/${id}`, data, config);
};

const getSingleAdditionalInfo = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(`${API}e-additional-info/${id}`, config);
};

const getAdditionalInfoWithOutProducts = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(`${API}e-additional-info/products`, config);
};

const EAdditionalInfo = {
  Index,
  Delete,
  Store,
  Edit,
  getSingleAdditionalInfo,
  getAdditionalInfoWithOutProducts,
};

export default EAdditionalInfo;
