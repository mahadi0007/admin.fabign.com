import Axios from "axios";
import { SmsApi } from "../Api";

// Check balance
const Balance = async (api_key) => {
  return await Axios.get(`${SmsApi}user/balance/?api_key=${api_key}`);
};

// Send sms
const SendSMS = async (api_key, msg, to) => {
  return await Axios.get(
    `${SmsApi}sendsms?api_key=${api_key}&msg=${msg}&to=${to}`
  );
};

const Sms = {
  Balance,
  SendSMS,
};

export default Sms;
