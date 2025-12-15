import React, { useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Divider,
  Button,
  useMediaQuery,
  Grid,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import EditShop from "../../components/owner/EditShop";

const MotionBox = motion(Box);

// Enhanced design: left column is full-bleed cover image with overlay info and merged stats
export default function OwnerProfileAdvanced() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { myShopData } = useSelector((s) => s.owner);
  const { userData } = useSelector((s) => s.user);
  const [isShopEdit, setIsShopEdit] = useState(false)
  const [oldData, setOldData] = useState()



  const shopImage = myShopData?.image || "";
  const shopName = myShopData?.name || "—";
  const ownerName = userData?.fullName || "—";
  const mobile = myShopData?.mobile || userData?.mobile || "N/A";
  const email = userData?.email || "N/A";
  const address = myShopData?.address || "Not provided";
  const city = myShopData?.city || "";
  const state = myShopData?.state || "";
  const pinCode = myShopData?.pinCode || "—";
  const role = userData?.role ? userData.role.toUpperCase() : "—";
  const joinedAt = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : "—";
  const shopCreatedAt = myShopData?.createdAt
    ? new Date(myShopData.createdAt).toLocaleDateString()
    : "—";

  const rating = myShopData?.rating ?? 4.6;
  const reviews = myShopData?.reviews ?? 128;

  const InfoRow = ({ label, value, icon }) => (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <Stack p={isMobile ? 0 : 2} width="100%" height={"100vh"} alignItems="center" justifyContent={"center"}>


      <MotionBox
        width="100%"
        maxWidth={1200}
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        sx={{
          overflow: "hidden",
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.02)"
              : " rgba(255,255,255,.05)",
          // boxShadow: theme.shadows[4],
          // borderRadius:2
        }}
      >
        {/* LEFT: full-bleed cover image with overlay — image positioned absolutely to fully fill panel */}
        <Box
          flexBasis={isMobile ? "auto" : "42%"}
          sx={{
            position: "relative",
            minHeight: isMobile ? 220 : 360,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            borderRadius: 2

          }}
        >
          {/* actual cover image fills entire panel */}
          {shopImage ? (
            <Box
              component="img"
              src={shopImage}
              alt={shopName}
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                width: "100%",
                height: "auto",
                objectFit: "cover",
                // slightly darken so overlay is readable
                filter: "brightness(0.75)",
                transformOrigin: "center",
                borderRadius: 2

              }}
            />
          ) : (
            // fallback plain background if no image
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(180deg,#111,#222)"
                    : "linear-gradient(180deg,#f5f5f5,#eaeaea)",
              }}
            />
          )}


          {/* overlay content: shop name, rating, small avatar — placed at bottom-left with inner padding */}
          <Box
            sx={{
              position: "relative",
              zIndex: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "100%",
              height: "100%",
              // backgroundImage: `url(${shopImage})`,

            }}
          >
            <Stack spacing={1} sx={{
              width: "100%",
              backdropFilter: "blur(10px)",
              background: theme.palette.mode === "dark"
                ? "rgba(0,0,0,0.7)"
                : " rgba(255,255,255,.5)",
              p: isMobile ? 2 : 3,
              // borderBottomLeftRadius:"8px"

            }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 800, color: "#FF1100" }}>
                    {shopName}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {city}{city && state ? ", " : ""}{state} • {pinCode}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ color: "green" }} />
                    <Typography sx={{ fontWeight: 700, color: "green" }}>{rating}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.85 }}>({reviews})</Typography>
                  </Box>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, color: "#FF1100", fontSize: "1.7rem", fontWeight: "700" }} src={userData?.avatar}>
                    {ownerName?.[0]}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{ownerName}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.85 }}>{role}</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Chip label="Verified" size="small" sx={{ bgcolor: "rgba(0,255,0,0.5)", }} />
                  <Chip label="Food" size="small" sx={{ bgcolor: "#FF1100", color: "white" }} />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* RIGHT: merged content and actions */}
        <Box flex={1} p={isMobile ? 2 : 3}>
          <Stack spacing={1.2} sx={{ background: "transparent" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={{ background: "transparent" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#FF1100" }}>
                  {shopName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Owned by <strong>{ownerName}</strong> • Joined {joinedAt}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Edit profile">
                  {/* <IconButton
                    size="small"
                    onClick={() => console.log("Edit profile dialog open")}
                    sx={{ border: `1px solid ${theme.palette.divider}` }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Button
                    onClick={() => setIsShopEdit(true)}
                    variant="outlined" startIcon={<EditIcon />} size="small" sx={{ textTransform: "none", color: "#FF1100" }}>
                    Edit Shop
                  </Button>

                </Tooltip>


              </Stack>
            </Stack>

            <Divider sx={{ my: 0.5 }} />


            {/* merged quick chips */}
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`Since ${shopCreatedAt}`} size="small" />
              <Chip label={`Pincode: ${pinCode}`} size="small" />
              <Chip label={`${city}${city && state ? ", " : ""}${state}`} size="small" />
              <Chip label={role} size="small" sx={{ bgcolor: "#FF1100", color: "white" }} />
            </Stack>

            {/* compact two-column info */}
            <Grid container spacing={2} sx={{ mt: 0.5, }}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 1, background: "transparent" }}>
                  <Stack spacing={1}>
                    <InfoRow label="Contact" value={mobile} icon={<PhoneIcon fontSize="small" />} />
                    <InfoRow label="Email" value={email} icon={<EmailIcon fontSize="small" />} />
                    <InfoRow label="Address" value={`${address}${address && (city || state) ? ", " : ""}${city} ${state}`} icon={<LocationOnIcon fontSize="small" />} />
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 1, background: "transparent" }}>
                  <Stack spacing={1}>
                    <InfoRow label="Owner" value={ownerName} icon={<BusinessIcon fontSize="small" />} />
                    <InfoRow label="Role" value={role} icon={<StarIcon fontSize="small" />} />
                    <InfoRow label="Joined" value={joinedAt} icon={<CalendarTodayIcon fontSize="small" />} />
                  </Stack>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 1 }} />

            <Stack direction={isMobile ? "column" : "row"} spacing={1} justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ textTransform: "none", px: 3 }}
                onClick={() => console.log("Open analytics")}
              >
                View Analytics
              </Button>

              <Button
                variant="outlined"
                sx={{ textTransform: "none", px: 3 }}
                onClick={() => console.log("Open manage products")}
              >
                Manage Products
              </Button>
            </Stack>
          </Stack>
        </Box>


      </MotionBox>


      {/* // shop edit */}
      {
        isShopEdit && (
          <Dialog
            open={isShopEdit}
            fullScreen={isMobile} // 📱 Mobile par full screen
            fullWidth={!isMobile} // 🖥 Desktop par hi width allow
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
            <EditShop setIsEdit={setIsShopEdit} isEdit={isShopEdit} item={oldData} />
          </Dialog>
        )
      }

    </Stack>
  );
}
