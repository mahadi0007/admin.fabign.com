import { AclAPI, API } from "../Api";
import Axios from "axios";

const GetCities = async () => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return await Axios.get(`${AclAPI}web/pathao/getCities`, config);
};

const GetZones = async (city) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return await Axios.get(`${AclAPI}web/pathao/getZones/${city}`, config);
};

const GetAreas = async (zone) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return await Axios.get(`${AclAPI}web/pathao/getAreas/${zone}`, config);
};

const CreateOrder = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}pathao-create-order`, data, config);
};

const Pathao = {
  GetCities,
  GetZones,
  GetAreas,
  CreateOrder,
};

export default Pathao;
