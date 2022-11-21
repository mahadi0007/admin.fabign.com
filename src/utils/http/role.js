import Axios from "axios";
import { AclAPI } from "../Api";

// List of routes
const Routes = async () => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${AclAPI}acl/role/route/paths`, header);
};

// List of roles
const Index = async () => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${AclAPI}acl/role`, header);
};

// Show specific item
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${AclAPI}acl/role/${id}`, header);
};

// Update role
const Update = async (id, data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${AclAPI}acl/role/${id}`, data, header);
};

// Store role
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${AclAPI}acl/role`, data, header);
};

// Delete specific role
const Delete = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.delete(`${AclAPI}acl/role/${id}`, header);
};

const Role = {
  Routes,
  Index,
  Show,
  Update,
  Store,
  Delete,
};

export default Role;
