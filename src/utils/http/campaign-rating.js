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
    `${API}campaign-rating?page=${page}&limit=${limit}`,
    config
  );
};

// Show single rating
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}campaign-rating/${id}`, header);
};

const Approve = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.put(`${API}campaign-rating/${id}`, data, config);
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
    `${API}campaign-rating/delete/${data.ratingId}/${data.campaignid}`,
    config
  );
};

const CampaignRating = {
  Index,
  Show,
  Approve,
  Delete,
};

export default CampaignRating;
