import Axios from "axios";
import { API, AclAPI } from "../Api";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}coupon-management`, config);
};

const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}coupon-management`, data, config);
};

// Show single product
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}coupon-management/${id}`, header);
};

// Update product
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}coupon-management/${id}`, data, header);
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

  return await Axios.delete(`${API}coupon-management/delete/${id}`, config);
};

const FindCoupon = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${AclAPI}e-efg/coupon/findCoupon`, data, config);
};

const Coupon = {
  Index,
  Store,
  Show,
  Update,
  Delete,
  FindCoupon,
};

export default Coupon;
