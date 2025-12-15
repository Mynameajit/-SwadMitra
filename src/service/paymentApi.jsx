import axios from "axios";
import { backendURL } from "../App";

export const createRazorpayOrder = ({amount}) => {
  return axios.post(
    `${backendURL}/payment/create-order`,
    { amount },
    { withCredentials: true }
  );
};
