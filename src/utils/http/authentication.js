import Axios from "axios";
import { AuthAPI } from "../Api";

// Login to account
const Login = async (data) => {
  const response = await Axios.post(`${AuthAPI}admin`, data);
  return response;
};

const Auth = {
  Login,
};

export default Auth;
