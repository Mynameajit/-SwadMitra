import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { delay, motion } from "framer-motion";
import { defaultIconColor, defaultTextColor } from "../../utils/color";


const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};


export const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  showPassword,
  togglePassword,
  InputIcon,
  delay,
  required,


}) => {
const theme=useTheme()

  return(
    
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{ width: "100%" }}
    custom={delay}
  >
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      type={type === "password" && showPassword ? "text" : type}
      value={value}
      onChange={onChange}
      size="small"
      required={required}
      InputProps={{
        style: {
          color: theme.palette.mode === "dark"
            ? "white"
            : "black",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "8px",
          fontSize: "14px",
        },
        endAdornment: (
          <InputAdornment position="end" onClick={togglePassword} style={{ cursor: type === "password" ? "pointer" : "default" }}>
            {
              InputIcon && <InputIcon sx={{ }} />
            }
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: { fontSize: "14px",
          color: theme.palette.mode === "dark"
            ? "white"
            : "black",
         },
      }}
    />
  </motion.div>
)}