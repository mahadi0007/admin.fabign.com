import Axios from "axios";
import { API } from "../Api";

// List of brand
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}cft-order?page=${page}&limit=${limit}`, header);
};

// Store cft-input
// const Store = async (data) => {
//   const header = {
//     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
//   }

//   return await Axios.post(`${API}cft`, data, header)
// }

// Show single brand
// const Show = async (id) => {
//   const header = {
//     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
//   }

//   return await Axios.get(`${API}products/brand/${id}`, header)
// }

// Udapte brand
// const Update = async (data,id) => {
//   const header = {
//     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
//   }

//   return await Axios.put(`${API}products/brand/${id}`,data, header)
// }

// Delete category
// const Delete = async (id) => {
//   const header = {
//     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
//   }

//   return await Axios.delete(`${API}cft/${id}`, header)
// }

const CFTOrder = {
  Index,
  // Store,
  // Delete
  // Show,
  // Update
  // Delete
};

export default CFTOrder;
