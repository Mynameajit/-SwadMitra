import { Email, Person, Verified } from "@mui/icons-material";
import { Badge, Stack, Typography, useTheme } from "@mui/material";

export const AccountInfoCard = ({ userData }) => {
  const theme = useTheme();

  return (
    <Stack
      gap={1}
      flex={1}
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
      <Typography
        sx={{
          fontWeight: 800,
          textAlign: "left",
          mb: 1,
          color: "#FF1100",
        }}
      >
        Account Info
      </Typography>

      <InfoRow icon={<Person />} label="Name" value={userData?.fullName} />
      <InfoRow icon={<Person />} label="Role" value={userData?.role} />
      <InfoRow icon={<Email />} label="Email" value={userData?.email} />
      <InfoRow
        icon={<Verified />}
        label="Status"
        value={userData?.status }
      />
    </Stack>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" gap={1} alignItems="center">
    <span>{icon}</span>
    <Typography fontSize={{ xs: 14, md: 15 }}>{label} :</Typography>
    <Typography fontSize={{ xs: 14, md: 15 }} fontWeight={600}>
      {value || "-"}
    </Typography>
  </Stack>
);
