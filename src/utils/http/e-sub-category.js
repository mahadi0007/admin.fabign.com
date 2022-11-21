import Axios from 'axios'
import { ECommerceApi } from '../Api'


// List of sub-category
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  }

  return await Axios.get(`${ECommerceApi}products/subCategory/?page=${page}&limit=${limit}`, header)
}

// Store sub-category
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  }

  return await Axios.post(`${ECommerceApi}products/subCategory/`, data, header)
}

// Show single sub-category
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  }

  return await Axios.get(`${ECommerceApi}products/subCategory/${id}`, header)
}

// Udapte sub-category
const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  }

  return await Axios.put(`${ECommerceApi}products/subCategory/${id}`, data, header)
}

// Delete sub-category
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
  }

  return await Axios.delete(`${ECommerceApi}products/subCategory/${id}`, header)
}


export const ESubCategory = {
  Index,
  Store,
  Show,
  Update,
  Delete
}
