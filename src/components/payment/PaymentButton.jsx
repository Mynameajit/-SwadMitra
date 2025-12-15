import { Button } from "@mui/material";
import loadRazorpay from "../../utils/loadRazorpay";
import axios from "axios";
import { createRazorpayOrder } from "../../service/paymentApi";
import toast from "react-hot-toast";

const PaymentButton = ({ amount }) => {

  const handlePayment = async () => {
    try {
      console.log("Pay button clicked");

      // 1️⃣ Load Razorpay
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Razorpay SDK load failed");
        return;
      }

      // 2️⃣ Create order (BACKEND CALL ONLY)
      const res = await createRazorpayOrder({ amount: 5000 })
      const { order } = res.data;
      console.log(order._id);

      // 3️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 50,
        currency: "INR",
        name: "SwadMitra",
        description: "Food Order",
        order_id: order.id,

        handler: function (response) {
          console.log("Payment success:", response);
          toast.success("Payment Successful");
        },

        theme: {
          color: "#FF1100",
        },
      };

      // 4️⃣ Open Razorpay <popup></popup>
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed, check console");
    }
  };

  return (
    <Button
      fullWidth
      onClick={handlePayment}
      variant="contained"
      sx={{ backgroundColor: "#FF1100" }}
    >
      Pay ₹{amount}
    </Button>
  );
};

export default PaymentButton;
