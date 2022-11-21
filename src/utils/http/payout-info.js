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
    `${API}payout-info?page=${page}&limit=${limit}`,
    config
  );
};

const Show = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}payout-info/${id}`, config);
};

const Update = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.put(`${API}payout-info/${id}`, data, config);
};

const PayoutInfo = {
  Index,
  Show,
  Update,
};

export default PayoutInfo;
