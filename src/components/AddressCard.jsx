import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  useTheme,
  Dialog,
  useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Home } from "@mui/icons-material";
import UpdateAddress from "./UpdateAddress";
import { useState } from "react";

const AddressCard = ({ address, selected, onSelect, }) => {
  const theme = useTheme()
  const accent = "#FF1100";
  const modeBgColor = theme.palette.mode === "dark" ? "rgba(250,250,250,.09)" : "rgba(0,0,0,0.08)"
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isEdit, setIsEdit] = useState(false)
  const [oldData, setOldData] = useState(null)

  const editHandler = (address) => {
    setIsEdit(true)
    setOldData(address)
  }


  return (
    <>
      <Paper
        onClick={onSelect}
        sx={{
          p: 1,
          cursor: "pointer",
          borderRadius: "8px",
          border: selected ? `2px solid ${accent}` : `1px solid ${modeBgColor}`,
          transition: "0.2s",
          "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
          width: "19rem",
          background:
            theme.palette.mode === "dark"
              ? selected ? "rgba(0,0,0,0.5) " : " rgba(255, 255, 255, 0.06)"
              : selected ? "rgba(250,250,250,0.5) " : "rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          overflow:"hidden",
          position:"relative"
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography  fontWeight={700} noWrap sx={{ textTransform: "capitalize", color: "#FF1100",fontSize:"1.2rem" }}>
                {address.name || "No Name"}
              </Typography>

              <Typography
                sx={{
                  backgroundColor: "rgba(255,17,0,0.06)",
                  padding: "3px 6px",
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
          </Box>

          <IconButton
            onClick={() => editHandler(address)}
            size="small" sx={{ color: accent ,height:"2.5rem",width:"2.5rem",position:"absolute",top:1,right:1}}>
            <EditIcon />
          </IconButton>
        </Stack>
      </Paper>

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
    </>
  );
};

export default AddressCard;
