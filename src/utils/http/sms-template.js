import Axios from "axios";
import { API } from "../Api";

// Check balance
const GetTemplate = async () => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}sms-template/get-template`, header);
};

const SMSTemplate = {
  GetTemplate,
};

export default SMSTemplate;
