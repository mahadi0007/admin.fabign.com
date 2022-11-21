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

  return await Axios.get(`${API}bulk-products`, config);
};

const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}bulk-products`, data, config);
};

// Show single product
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}bulk-products/${id}`, header);
};

// Update product
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}bulk-products/${id}`, data, header);
};

// Delete product
const Delete = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}bulk-products/delete/${id}`, config);
};

const BulkProduct = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default BulkProduct;
