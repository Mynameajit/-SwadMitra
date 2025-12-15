import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Avatar,
  Typography,
  Chip,
  Divider,
  IconButton,
  Button,
  useTheme,
  Dialog,
  useMediaQuery,
  CircularProgress
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { px } from "framer-motion";
import { Delete, Logout } from "@mui/icons-material";
import UpdateAddress from "../../components/UpdateAddress";
import { setUserData } from "../../redux/userSlice";
import { backendURL } from "../../App";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getInitials = (name = "") => {
  const p = name.trim().split(" ");
  return p.length > 1 ? `${p[0][0]}${p[1][0]}` : p[0][0];
};



const UserProfile = () => {
  const theme = useTheme();
  const Navigate=useNavigate()
  const { userData } = useSelector(state => state.user);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch()

  const [isEdit, setIsEdit] = useState(false)
  const [oldData, setOldData] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!userData) return null;


  const editHandler = (address) => {
    setOldData(address)
    setIsEdit(true)
  }

  const delateHandle = async (address) => {
    setOldData(address)
    setLoading(true)
    try {
      const res = await axios.post(`${backendURL}/user/address/delate/${address?._id}`,{}, {
        withCredentials: true,

      });
      toast.success(res.data.message);
      dispatch(setUserData(res.data.user));
      setLoading(false)
    setOldData(null)

    } catch (error) {
      setLoading(false)
      console.log("Address delate error", error);
      toast.error(error.response?.data?.message || "Internal server error");
    }
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 1, md: 8 },
        pt: { xs: 7, md: 11 },
        pb: { xs: 7, md: 2 },
        display: "flex",
        justifyContent: "center",
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Stack direction={"column"} sx={{ width: "100%", maxWidth: 1200 }}>


        {/* ================= PROFILE SUMMARY ================= */}

        <Stack
          marginX={"auto"}
          width={{ xs: "100%", md: "80%" }}
          direction={{ xs: "column", md: "row" }}
          gap={2}
          sx={{
            py: 3,
            borderRadius: 4,
            textAlign: "center",
            px: { xs: "0", md: 8 },
            position: "relative"
          }}>
          <Button sx={{
            bgcolor: "#FF1100",
            color: "white",
            fontSize: ".7rem",
            textTransform: "capitalize",
            position: "absolute",
            bottom: 2,
            right: 2,
            zIndex: 100,
            width: { xs: "100%", md: "8rem" },
            borderRadius: ".7rem"
          }}>

            <Logout /> LogOut
          </Button>

          <Stack spacing={1} alignItems="center">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: 34,
                bgcolor: "#22c55e",
                color: "#020617",
                fontWeight: "bold",
              }}
            >
              {getInitials(userData.fullName)}
            </Avatar>

            <Typography variant="h6">{userData.fullName}</Typography>


            <Divider flexItem />

            <Chip
              icon={<EmailIcon />}
              label={userData.email}
              variant="outlined"
              sx={{ width: "100%" }}
            />

            {userData.isVerified ? (
              <Chip
                icon={<VerifiedIcon />}
                label="Verified Account"
                color="success"
                sx={{ width: "100%" }}
              />
            ) : (
              <Chip
                label="Not Verified"
                color="warning"
                sx={{ width: "100%" }}
              />
            )}
          </Stack>

          {/* ================= ACCOUNT INFO ================= */}
          <Stack
            gap={1}
            sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
              background:
                theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
              backdropFilter: "blur(6px)",
            }}
          >


            <InfoRow icon={<PersonIcon />} label="Name" value={userData.fullName} />
            <InfoRow icon={<PersonIcon color="#FF1100" />} label="Role" value={userData.role} />
            <InfoRow icon={<EmailIcon />} label="Email" value={userData.email} />
            <InfoRow icon={<BadgeIcon />} label="User ID" value={userData._id} />
            <InfoRow
              icon={<VerifiedIcon />}
              label="Status"
              value={userData.isVerified ? "Verified" : "Unverified"}
            />
          </Stack>

        </Stack>
        <Divider flexItem sx={{
          marginX: "auto",
          width: { xs: "100%", md: "80%" }
        }} />


        {/* ================= ADDRESS SECTION ================= */}
        < Stack
          marginX={"auto"}
          width={{ xs: "100%", md: "90%" }}
          gap={2}
          sx={{
            boxShadow: { xs: 0, md: 1 },
            py: 3,
            borderRadius: 4,
            textAlign: "center",
            px: { xs: "0", md: 8 },
            boxShadow: 0

          }}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={3}
            gap={2}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }} color="#FF1100">🏠 Addresses</Typography>
            <Button 
            onClick={()=>Navigate("/shipping-details")}
            sx={{ bgcolor: "#FF1100", color: "white", fontSize: ".7rem", textTransform: "capitalize" }}>
              + Add Address
            </Button>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            sx={{
              flexWrap: "wrap",

            }}
          >

            {userData.address?.map(address => (
              <Stack
                direction={"column"}
                sx={{
                  p: 2,
                  width: "19rem",
                  borderRadius: 3,
                  background:
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                  backdropFilter: "blur(6px)",
                  boxShadow: { xs: 1, md: 2 },
                  justifyContent: "start",
                  alignItems: "start"
                }}
              >

                <Stack direction="row" gap={1} >

                  <Typography fontWeight={700} noWrap sx={{ textTransform: "capitalize", color: "#FF1100", fontSize: "1.2rem" }}>
                    {address.name || "No Name"}
                  </Typography>

                  <Typography
                    sx={{
                      backgroundColor: "rgba(255,17,0,0.1)",
                      padding: "1px 6px",
                      fontSize: 12,
                      borderRadius: 1,
                      color: "#FF1100",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {address.isLocation || "Home"}
                  </Typography>
                </Stack>

                <Typography sx={{ fontSize: 13, color: "gray" }}>
                  {address.buildingName}, {address.landmark},
                </Typography>
                <Typography sx={{ fontSize: 13, color: "gray" }}>
                  {address.city}, {address.state} - {address.pinCode}
                </Typography>
                <Typography sx={{ fontSize: 13 }}>📞 {address.mobile}</Typography>

                <IconButton
                  onClick={() => editHandler(address)}
                  size="small" sx={{ color: "#FF1100", height: "2.5rem", width: "2.5rem", position: "absolute", top: 1, right: 1 }}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => delateHandle(address)}
                  size="small" sx={{ color: "#FF1100", height: "2.5rem", width: "2.5rem", position: "absolute", bottom: 1, right: 1 }}>

                  {
                    loading && address._id === oldData._id ? <CircularProgress size={18} sx={{ color: '#FF1100' }} /> : <Delete />
                  }
                </IconButton>
              </Stack>
            ))}
          </Stack>

        </Stack>


      </Stack>



      {
        isEdit && (
          <Dialog
            open={isEdit}
            fullScreen={isMobile}
            fullWidth={!isMobile}
            maxWidth="md" // Desktop size
            BackdropProps={{
              sx: {
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(0,0,0,0.4)",
              },
            }}
            PaperProps={{
              sx: {
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.4)"
                    : "rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                borderRadius: isMobile ? 0 : 2,
                border: `1px solid rgba(0,0,0,${theme.palette.mode === "dark" ? 0.2 : 0.1
                  })`,
                transition: "all 0.3s ease-in-out",
                width: isMobile ? "100%" : "auto",
                height: isMobile ? "100%" : "auto",
                margin: isMobile ? 0 : "auto"
              },
            }}
          >
            <UpdateAddress setIsEdit={setIsEdit} isEdit={isEdit} address={oldData} />
          </Dialog>
        )
      }

    </Box>
  );
};


const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" gap={1} alignItems="center">
    <span >{icon}</span>
    <Typography fontSize={{ xs: 14, md: 15 }} >
      {label} :
    </Typography>
    <Typography fontSize={{ xs: 14, md: 15 }}>{value}</Typography>
  </Stack>
);

export default UserProfile;
