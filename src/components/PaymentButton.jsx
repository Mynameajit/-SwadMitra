import loadRazorpay from "../utils/loadRazorpay";
import toast from "react-hot-toast";
import { createRazorpayOrder, verifyPayment } from "../utils/paymentApi";

export const handlePayment = async (amount) => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    toast.error("Razorpay failed to load");
    return;
  }

  const res = await createRazorpayOrder({
    amount: amount * 100, // convert to paise
  });

  const { order } = res.data;

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: "INR",
    name: "SwadMitra",
    description: "Food Order",
    order_id: order.id,

    handler: async function (response) {
      const verifyRes = await verifyPayment(response);

      if (verifyRes.data.success) {
        toast.success("Payment Successful 🎉");
      } else {
        toast.error("Payment Verification Failed");
      }
    },

    theme: {
      color: "#FF1100",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
