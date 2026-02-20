import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

/* =================================================
   Reusable QuantityInput Component
================================================= */

export const QuantityInput = ({
  qty = 1,
  increaseQty,
  decreaseQty,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <TextField
      value={qty}
      size="small"
      disabled={disabled}
      inputProps={{
        readOnly: true,
        style: {
          textAlign: "center",
          fontWeight: 700,
        },
        "aria-label": "quantity",
      }}
      sx={{
        width: 130,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          height: 38,
          "& fieldset": {
            borderColor: theme.palette.primary.main,
            borderWidth: 1.5,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              size="small"
              onClick={decreaseQty}
              disabled={disabled}
              aria-label="decrease quantity"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <RemoveRoundedIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={increaseQty}
              disabled={disabled}
              aria-label="increase quantity"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default QuantityInput;
