import React from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const MotionTextField = motion(TextField);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

// ================= Button ===================
export const CreateShopBtn = ({ custom, label }) => {
  return (
    <MotionButton
      initial="hidden"
      animate="visible"
      custom={custom}
      variants={containerVariants}
    >
      {label}
    </MotionButton>
  );
};

// ================= Input Component ===================
const AddShopInput = ({
  label,
  placeholder,
  type = "text",
  custom = 0.2,
  value,
  onChange,
  width = "100%",
  select = false,
  options = [],
  defaultValue,
  isMobileNo,
  onlyRed=false
}) => {
  return (
    <Stack width={width} spacing={"2px"}>
      <MotionTypography
        initial="hidden"
        animate="visible"
        custom={custom - 0.05}
        variants={containerVariants}
        variant="body2"
        fontWeight={500}
      >
        {label}
      </MotionTypography>

      <MotionTextField
        select={select}
        value={value ?? defaultValue ?? ""} 
        onChange={onChange}
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        type={type}
        disabled={onlyRed}
        size="small"
        initial="hidden"
        animate="visible"
        custom={custom}
        variants={containerVariants}
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) => {
            if (!selected) return placeholder;  // FIXED SELECT PLACEHOLDER
            const found = options.find((o) => o.value === selected);
            return found ? found.label : selected;
          },
        }}
        InputProps={
          isMobileNo
            ? {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ fontSize: "13px", opacity: 0.8 }}
                  >
                    +91
                  </InputAdornment>
                ),
              }
            : {}
        }
        sx={{
          fontSize: "13px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": { borderWidth: "1px" },
          },
          input: {
            paddingY: "9px",
            "&::placeholder": {
              fontSize: "12px",
              opacity: 0.7,
            },
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&[type=number]": {
              MozAppearance: "textfield",
            },
          },
        }}
      >
        {select &&
          options.map((opt, index) => (
            <MenuItem key={index} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </MotionTextField>
    </Stack>
  );
};

export default AddShopInput;
