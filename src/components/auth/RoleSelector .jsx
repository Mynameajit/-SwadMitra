import React, { useState } from "react";
import { Stack, Button, Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { accentPurpleHover } from "../../utils/color";

const RoleSelector = ({ selected, setSelected }) => {
const theme=useTheme()

    const buttons = [
        { label: "User", value: "user" },
        { label: "Owner", value: "owner" },
        { label: "DeliveryBoy", value: "delivery" },
    ];

    const accentOrange = "#ff8c00";
    const defaultTextColor = "#fff";
    const defaultBorder = "#777";

    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: "12px",
                mt: 2,
                position: "relative",
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="center">
                {buttons.map((btn) => (
                    <Box key={btn.value} sx={{ position: "relative", width: "100%" }}>
                        {/* Sliding background effect */}
                        {selected === btn.value && (
                            <motion.div
                                layoutId="active-bg"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: accentPurpleHover,
                                    borderRadius: 10,
                                    zIndex: 0,
                                }}
                            />
                        )}

                        <Button
                            fullWidth
                            onClick={() => setSelected(btn.value)}
                            disableRipple
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                border: "1px solid",
                                borderColor: selected === btn.value ? "black" : accentPurpleHover,
                                color:selected === btn.value ? "white": theme.palette.mode === "dark"
                                    ? "white"
                                    : "black",
                                backgroundColor: selected === btn.value ? accentPurpleHover : "transparent",
                                position: "relative",
                                zIndex: 1,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    borderColor: accentOrange,
                                },
                            }}
                        >
                            {btn.label}
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default RoleSelector;
