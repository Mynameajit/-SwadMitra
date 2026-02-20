import axios from "axios";
import api from "./api";

export const createRazorpayOrder = ({ amount }) => {
  return api.post(`/payment/create-order`, { amount });
};

export const verifyPayment = (data) => api.post("/payment/verify", data);
