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
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import StoreIcon from "@mui/icons-material/Store";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import EditShop from "../../components/owner/EditShop";
import { Person, RollerShades, RollerShadesSharp, StarTwoTone } from "@mui/icons-material";
import { FaAddressBook, FaCity, FaTreeCity } from "react-icons/fa6";
import { TbMapPinCode } from "react-icons/tb";

export default function OwnerProfile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { myShopData } = useSelector((s) => s.owner);
  const { userData } = useSelector((s) => s.user);

  const [openEdit, setOpenEdit] = useState(false);

  const shopImage = myShopData?.image;
  const shopName = myShopData?.name || "My Shop";
  const ownerName = userData?.fullName || "Owner";
  const ownerFirstName = ownerName.split(" ")[0];
  const mobile = myShopData?.mobile || userData?.mobile;
  const email = userData?.email;
  const address = myShopData?.address;
  const rating = myShopData?.rating || 4.6;
  const joined = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : "—";

  return (
    <Stack width="100%" minHeight="100vh" alignItems="center">
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1150,
          height: "100%",
          p: isMobile ? 1 : 2,
          m: isMobile ? 1 : 6,
          borderRadius: 2,
          boxShadow: 4,
          bgcolor: "transparent",
        }}
      >
        <Stack direction={isMobile ? "column" : "row"} spacing={3}>
          {/* ================= LEFT ================= */}
          <Box
            width={isMobile ? "100%" : "40%"}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={shopImage}
              alt={shopName}
              sx={{
                width: "100%",
                height: isMobile ? 220 : 490,
                objectFit: "cover",
              }}
            />

            {/* dark overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
              }}
            />

            {/* shop name + rating */}
            <Stack position="absolute" bottom={92} left={16} spacing={0.5}>
              <Typography variant="h6" fontWeight={700} color="#fff">
                {shopName}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <StarIcon sx={{ color: "gold", fontSize: 20 }} />
                <Typography color="#fff" fontWeight={600}>
                  {rating}
                </Typography>
              </Stack>
            </Stack>

            {/* OWNER NAME WORD */}
            <Stack direction="row" py={2} spacing={2} justifyContent={"space-between"} alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 56, height: 56 }}>
                  {ownerFirstName[0]}
                </Avatar>
                <Box>
                  <Typography fontWeight={700}>{ownerName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Primary Account Holder
                  </Typography>
                </Box>
              </Stack>

              <Chip label={userData?.role} color="success" />

            </Stack>
          </Box>

          {/* ================= RIGHT ================= */}
          <Box flex={1}>
            <Stack spacing={2.5}>
              {/* header */}
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {shopName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Owned by <strong>{ownerName}</strong>
                  </Typography>
                </Box>

                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => setOpenEdit(true)}
                >
                  Edit Shop
                </Button>
              </Stack>

              {/* chips */}
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Verified Shop" color="success" />
                <Chip label="Food Category" color="primary" />
                <Chip icon={<StoreIcon />} label="Active" />
                <Chip
                  label="Manage Products"
                  clickable
                  onClick={() => console.log("manage products")}
                />
                <Chip
                  label="Analytics"
                  clickable
                  onClick={() => console.log("analytics")}
                />
              </Stack>

              <Divider />

              {/* DETAILS */}
              <Grid container spacing={{ xs: 2, md: 14 }}>
                <Grid item xs={12} sm={6}>
                  <Info icon={<Person />} label="Name" value={ownerName} />
                  <Info icon={<PhoneIcon />} label="Mobile" value={mobile} />
                  <Info icon={<RollerShadesSharp />} label="Role" value={userData.role} />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <Info icon={<EmailIcon />} label="Email" value={email} />
                  <Info
                    icon={<CalendarTodayIcon />}
                    label="Joined On"
                    value={joined}
                  />
                </Grid>
              </Grid>

              <Divider />



              {/* owner card */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Grid container spacing={{ xs: 2, md: 14 }}>
                  <Grid item xs={12} sm={6} spacing={5}>
                    <Info
                      icon={<FaCity />}
                      label="City"
                      value={myShopData.city}
                    />
                    <Info icon={<FaTreeCity />} label="State" value={myShopData.state} />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Info icon={<TbMapPinCode />} label="Email" value={email} />
                    <Info
                      icon={<FaAddressBook />}
                      label="Address"
                      value={address}
                    />
                  </Grid>
                </Grid>


              </Stack>

              <Divider />

              <Stack width={"100%"} direction={"row"} justifyContent={"end"} gap={2}>
                <Button
                  sx={{ bgcolor: "#FF1100" }}
                >
                  View Orders
                </Button>

                <Button
                  sx={{ bgcolor: "#FF1100" }}
                >

                  analyze
                </Button>

              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* EDIT DIALOG */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
      >
        <EditShop setIsEdit={setOpenEdit} />
      </Dialog>
    </Stack>
  );
}

/* INFO ROW */
const Info = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1.2} alignItems="center" mt={1}>
    {icon}
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={600}>{value || "—"}</Typography>
    </Box>
  </Stack>
);
