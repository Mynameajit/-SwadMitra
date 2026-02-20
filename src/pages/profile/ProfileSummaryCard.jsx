import { Avatar, Button, Chip, CircularProgress, Divider, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { AccountInfoCard } from "./AccountInfoCard";
import { Email, Logout, Verified } from "@mui/icons-material";

export const ProfileSummaryCard = ({ userData, logoutLoading, handleLogout }) => {
  const theme = useTheme();

  return (
    <Stack
      marginX="auto"
      width={{ xs: "100%", md: "85%" }}
      direction={{ xs: "column", md: "row" }}
      gap={2}
      sx={{
        py: 3,
        borderRadius: 4,
        textAlign: "center",
        px: { xs: 0, md: 8 },
        position: "relative",
      }}
    >
      {/* Logout Button UI only */}
      <Tooltip
      title="Logout "
      >

      <Button
        onClick={handleLogout}
        sx={{
          bgcolor: "#FF1100",
          color: "white",
          fontSize: ".7rem",
          textTransform: "capitalize",
          position: "absolute",
          bottom: 2,
          right: 0,
          zIndex: 100,
          width: { xs: "100%", md: "8rem" },
          borderRadius: ".7rem",
          "&:hover": { bgcolor: "#E01000" },
        }}
      >
        {logoutLoading ? (
          <CircularProgress size={18} sx={{ color: "white" }} />
        ) : (
          <>
            <Logout sx={{ fontSize: 18, mr: 0.8 }} /> LogOut
          </>
        )}
      </Button>
      </Tooltip>

      {/* Left Profile */}
      <Stack spacing={1} alignItems="center" flex={1} width={{xs:"100%",md:"70%"}}>
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
          {userData?.fullName?.[0] || "U"}
        </Avatar>

        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {userData?.fullName || "User"}
        </Typography>

        <Divider flexItem />

        <Chip
          icon={<Email />}
          label={userData?.email || "user@email.com"}
          variant="outlined"
          sx={{ width: "100%" }}
        />

        {userData?.isVerified ? (
          <Chip
            icon={<Verified />}
            label="Verified Account"
            color="success"
            sx={{ width: "100%" }}
          />
        ) : (
          <Chip label="Not Verified" color="warning" sx={{ width: "100%" }} />
        )}
      </Stack>

      {/* Right Account Info */}
      <AccountInfoCard userData={userData} />
    </Stack>
  );
};
