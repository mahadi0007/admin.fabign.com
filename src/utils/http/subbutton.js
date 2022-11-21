import Axios from "axios";
import { API } from "../Api";

// List of button
const Index = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}sub-button?page=${page}&limit=${limit}`,
    header
  );
};

// Make default sub button
const MakeDefault = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}sub-button/make-default/${data.id}/${data.category}/${data.subcategory}`,
    header
  );
};

const SubButton = {
  Index,
  MakeDefault,
};

export default SubButton;
