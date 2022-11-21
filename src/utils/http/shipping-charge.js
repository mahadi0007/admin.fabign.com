import Axios from "axios";
import { API } from "../Api";

// List of zones
const AllZones = async () => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}shipping-charge/`, header);
};

// Add or Udapte shipping charge
const AddUpdate = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}shipping-charge/`, data, header);
};

const ShippingCharge = {
  AllZones,
  AddUpdate,
};

export default ShippingCharge;
