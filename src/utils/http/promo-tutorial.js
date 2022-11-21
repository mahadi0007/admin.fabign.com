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
    `${API}promo-tutorial-manage?page=${page}&limit=${limit}`,
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

  return await Axios.get(`${API}promo-tutorial-manage/${id}`, config);
};

const Update = async (data, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.put(`${API}promo-tutorial-manage/${id}`, data, config);
};

const PromoTutorial = {
  Index,
  Show,
  Update,
};

export default PromoTutorial;
