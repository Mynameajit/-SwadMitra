import axios from "axios";
import api from "./api";

export const createRazorpayOrder = async ({ amount }) => {
  const res = await api.post(`/payment/create-order`, { amount });
  return res;
  console.log(res);
};

export const verifyPayment =async (data) => {
const res =await api.post("/payment/verify", data);
return res;
}
