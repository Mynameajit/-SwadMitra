import {
  Stack,
  Grid,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  Home,
  Business,
  Person,
  Phone,
  LocationOn,
  Apartment,
  MarkunreadMailbox,
  ArrowBack,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import AddShopInput from "./FormInput";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../../features/address/addressService";
import toast from "react-hot-toast";

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionStack = motion(Stack);

const AddressForm = ({
  editData,
  onSubmit,
  loading,
  onClose,
  isEdit,
  isDialog = true,
}) => {
  const { currentCity, address } = useSelector((state) => state.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 INDIVIDUAL STATES
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState(currentCity || "");
  const [state, setState] = useState(address?.state || "");
  const [pinCode, setPinCode] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("home");

  // 🔹 EDIT MODE → PREFILL
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setMobile(editData.mobile || "");
      setCity(editData.city || "");
      setState(editData.state || "");
      setPinCode(editData.pinCode || "");
      setBuildingName(editData.buildingName || "");
      setLandmark(editData.landmark || "");
      setAddressType(editData.isLocation || "home");
    }
  }, [editData]);

  const handleSubmit = async () => {
    const formData = {
      name,
      mobile,
      city,
      state,
      pinCode,
      buildingName,
      landmark,
      isLocation: addressType,
    };
    if (!name || !mobile || !city || !state || !pinCode || !buildingName) {
      return toast.error("Please fill all required fields");
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return toast.error("Enter valid mobile number");
    }

    if (!/^\d{6}$/.test(pinCode)) {
      return toast.error("Enter valid pincode");
    }

    onSubmit(formData);
  };

  return (
    <Stack
      gap={2}
      p={{ xs: 2, md: 3 }}
      width={{ xs: "100", md: isDialog ? "100%" : "100%" }}
      margin={"auto"}
      boxShadow={{
        xs: "",
        md: isDialog ? "" : "1px 1px 12px 1px rgba(250,250,250,.2)",
      }}
      borderRadius={isDialog ? "" : "1rem"}
      mt={{ xs: "", md: isDialog ? "" : "2rem" }}
    >
      {/* 🔹 TITLE */}
      <Stack gap={0.5}>
        <MotionTypography
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          variant="h5"
          fontWeight={700}
          color="#FF1100"
        >
          {!isDialog && (
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack sx={{ color: "#FF1100" }} />
            </IconButton>
          )}
          {isEdit ? "Edit Address" : "Add New Address"}
        </MotionTypography>
        <MotionTypography
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          variant="body2"
          color="text.secondary"
        >
          {isEdit
            ? "Update your delivery address"
            : "Enter delivery address details"}
        </MotionTypography>
      </Stack>

      {/* 🔹 FORM FIELDS */}

      <Stack
        width={"100%"}
        gap={{ xs: 2, md: 3 }}
        mt={1}
        direction={{ xs: "column", md: "row" }}
      >
        <AddShopInput
          label="Full Name"
          placeholder="Enter full name"
          icon={<Person />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <AddShopInput
          label="Mobile Number"
          placeholder="10 digit mobile"
          icon={<Phone />}
          value={mobile}
          isMobileNo
          onChange={(e) => setMobile(e.target.value)}
        />
      </Stack>

      <Stack width={"100%"} mt={1} gap={{ xs: 1, md: 3 }} direction={"row"}>
        <AddShopInput
          label="Pincode"
          placeholder="Area pincode"
          icon={<MarkunreadMailbox />}
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />

        <AddShopInput
          label="City"
          placeholder="City"
          icon={<LocationOn />}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <AddShopInput
          label="State"
          placeholder="State"
          icon={<LocationOn />}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Stack>

      <Stack
        width={"100%"}
        mt={1}
        gap={{ xs: 2, md: 3 }}
        direction={{ xs: "column", md: "row" }}
      >
        <AddShopInput
          label="House / Building / Village"
          placeholder="House no, building name,Village"
          icon={<Apartment />}
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
        />

        <AddShopInput
          label="Landmark (optional)"
          placeholder="Nearby place"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
      </Stack>

      {/* 🔹 ADDRESS TYPE */}
      <Stack direction="row" mt={1} gap={1}>
        <MotionStack
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          direction="row"
          alignItems="center"
          gap={0.5}
          px={2}
          py={0.7}
          borderRadius="8px"
          bgcolor={addressType === "home" ? "#FF1100" : "gray"}
          color="white"
          sx={{ cursor: "pointer" }}
          onClick={() => setAddressType("home")}
        >
          <Home fontSize="small" />
          <Typography fontSize={14}>Home</Typography>
        </MotionStack>

        <MotionStack
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          direction="row"
          alignItems="center"
          gap={0.5}
          px={2}
          py={0.7}
          borderRadius="8px"
          bgcolor={addressType === "work" ? "#FF1100" : "gray"}
          color="white"
          sx={{ cursor: "pointer" }}
          onClick={() => setAddressType("work")}
        >
          <Business fontSize="small" />
          <Typography fontSize={14}>Work</Typography>
        </MotionStack>
      </Stack>

      {/* 🔹 SUBMIT BUTTON */}
      <Stack
        direction={"row"}
        mt={1}
        width={"100%"}
        gap={2}
        justifyContent={"end"}
      >
        {isDialog && (
          <MotionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            sx={{
              border: "1px solid #FF1100",
              color: "#FF1100",
              py: 1,
              px: 2,
              borderRadius: "10px",
              "&:hover": { boxShadow: "1px 1px 15px 1px #FF1100" },
            }}
          >
            Cancel
          </MotionButton>
        )}

        <MotionButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: "#FF1100",
            color: "white",
            py: 1,
            px: 2,
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#e00e00",
              boxShadow: "1px 1px 15px 1px #FF1100",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : isEdit ? (
            "Update Address"
          ) : (
            "Save Address"
          )}
        </MotionButton>
      </Stack>
    </Stack>
  );
};

export default AddressForm;
