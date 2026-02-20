import React from "react";
import { Button, Stack, TextField } from "@mui/material";

const CouponBox = () => {
  return (
    <Stack spacing={1} direction="row" mt={2}>
      <TextField
        size="small"
        variant="outlined"
        fullWidth
        placeholder="Apply Coupon"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "2.1rem",
            padding: "0 8px",
            borderRadius: "8px",
            "&:hover fieldset": { borderColor: "#FF1100" },
            "&.Mui-focused fieldset": { borderColor: "#FF1100" },
          },
        }}
      />
      <Button
        sx={{
          borderRadius: "10px",
          background: "#FF1100",
          textTransform: "none",
          color: "white",
          fontWeight: 900,
          padding: "0px 10px",
          fontSize: ".85rem",
        }}
      >
        Apply
      </Button>
    </Stack>
  );
};

export default CouponBox;
