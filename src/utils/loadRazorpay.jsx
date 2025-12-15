const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded");
      resolve(true);
    };
    script.onerror = () => {
      console.log("Razorpay script failed");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default loadRazorpay;
