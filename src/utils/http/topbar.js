import Axios from "axios";
import { API } from "../Api";

const Index = async () => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}topbar`, config);
};

const Store = async (data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}topbar`, data, config);
};

const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}topbar/${id}`, header);
};

const Edit = async (id, data) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.put(`${API}topbar/${id}`, data, config);
};

const Delete = async (id) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.delete(`${API}topbar/delete/${id}`, config);
};

const MakeDefault = async (id) => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const data = {
    is_default: true,
  };
  return await Axios.put(`${API}topbar/makedefault/${id}`, data, config);
};

const TopBar = {
  Index,
  Store,
  Show,
  Edit,
  Delete,
  MakeDefault,
};

export default TopBar;
