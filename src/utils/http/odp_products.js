import Axios from "axios";
import { API } from "../Api";

// List of Products
const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}odp-products`, config);
};

// Store Products
const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}odp-products`, data, config);
};

// Show single product
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}odp-products/${id}`, header);
};

// Update product
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}odp-products/${id}`, data, header);
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

  return await Axios.delete(`${API}odp-products/delete/${id}`, config);
};

const ODPProduct = {
  Index,
  Store,
  Show,
  Update,
  Delete,
};

export default ODPProduct;
