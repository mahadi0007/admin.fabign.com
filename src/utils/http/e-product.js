import Axios from "axios";
import { API, ECommerceApi } from "../Api";

// List of Products
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}e-product/?page=${page}&limit=${limit}`,
    header
  );
};

// Store Products
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}e-product/`, data, header);
};

// Show single product
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-product/${id}`, header);
};

// Update product
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-product/${id}`, data, header);
};

// Delete product
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${API}e-product/${id}`, header);
};

// upload file
const UploadFile = async (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return await Axios.post(`${ECommerceApi}upload/files/`, data, headers);
};

// Update Stock
const StockUpdate = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}stock-management`, data, header);
};

// Search all e-product
const SearchAllIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(`${API}e-product?searchText=${query}`, header);
};

const EProduct = {
  Index,
  Store,
  Show,
  Update,
  StockUpdate,
  Delete,
  UploadFile,
  SearchAllIndex,
};

export default EProduct;
