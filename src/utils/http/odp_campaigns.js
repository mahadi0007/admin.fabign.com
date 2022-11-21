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

  return await Axios.get(`${API}odp-campaigns`, config);
};

const getSingleCampaign = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(`${API}odp-campaigns/${id}`, config);
};

// Update campaign
const Update = async (id, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.put(`${API}odp-campaigns/${id}`, data, config);
};

const Delete = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}odp-campaigns/delete/${id}`, config);
};

const ODPCampaign = {
  Index,
  getSingleCampaign,
  Update,
  Delete,
};

export default ODPCampaign;
