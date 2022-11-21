import Axios from "axios";
import { API } from "../Api";

// Search admin
const Admin = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/admin?query=${data}`, header);
};

// Search user
const User = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/user?query=${data}`, header);
};

// Search category
const Category = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/category?query=${data}`, header);
};

const Category2 = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/category2?query=${data}`, header);
};

// Search sub category
const SubCategory = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/sub-category?query=${data}`, header);
};

const SubCategory2 = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/sub-category2?query=${data}`, header);
};

// Search leaf category
const LeafCategory = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/leaf-category?query=${data}`, header);
};

// Search element
const Element = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/element?query=${data}`, header);
};

const Element2 = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/element2?query=${data}`, header);
};

// Search size
const Size = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/size?query=${data}`, header);
};

// Search fabric
const Fabric = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/fabric?query=${data}`, header);
};

const Fabric2 = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}search/fabric2?query=${data}`, header);
};

// Search colors
const Color = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}search/color?query=${data}`, config);
};

// Search types
const Type = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}search/type?query=${data}`, config);
};

// Search qualities
const Quality = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(`${API}search/quality?query=${data}`, config);
};

const Search = {
  Admin,
  User,
  Category,
  Category2,
  SubCategory,
  SubCategory2,
  LeafCategory,
  Element,
  Element2,
  Size,
  Fabric,
  Fabric2,
  Color,
  Type,
  Quality,
};

export default Search;
