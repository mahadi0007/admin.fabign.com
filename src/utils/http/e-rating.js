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
  return await Axios.get(`${API}e-rating?page=${page}&limit=${limit}`, config);
};

// Show single rating
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-rating/${id}`, header);
};

const Approve = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.put(`${API}e-rating/${id}`, data, config);
};

const Delete = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(
    `${API}e-rating/delete/${data.ratingId}/${data.productid}`,
    config
  );
};

const Rating = {
  Index,
  Show,
  Approve,
  Delete,
};

export default Rating;
