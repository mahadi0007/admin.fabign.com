import Axios from "axios";
import { AuthAPI, ECommerceApi } from "../Api";

// Login to account
const Login = async (data) => {
  const response = await Axios.post(`${AuthAPI}admin`, data);
  return response;
};

const ELogin = async (data) => {
  const response = await Axios.post(`${ECommerceApi}auth/admin/login`, data);
  return response;
};

const Auth = {
  Login,
  ELogin,
};

export default Auth;
