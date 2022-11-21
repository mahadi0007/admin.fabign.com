import Axios from "axios";
import { AclAPI, ECommerceApi } from "../Api";

// Get call for tailor data
const GetActiveTailor = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${AclAPI}web/active/cft`, config);
};

// Store a order for hiring tailor
const HireATailor = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.post(`${AclAPI}web/cft-order/`, data, config);
};

// List of zones
const AllZones = async () => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${ECommerceApi}delivery/charge/zones`, header);
};

// List of zones
const ShippingIndex = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${ECommerceApi}delivery/charge/calculate?origin=cft&zone=${data}`,
    header
  );
};

const CallForTailor = {
  GetActiveTailor,
  HireATailor,
  AllZones,
  ShippingIndex,
};

export default CallForTailor;
