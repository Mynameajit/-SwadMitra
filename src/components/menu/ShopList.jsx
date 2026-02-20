import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ShopCard from "./ShopCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopsInCity } from "../../features/shop/ShopsService";
import { FaBatteryEmpty } from "react-icons/fa6";

export const HIDDEN_SCROLLBAR = {
  msOverflowStyle: "none", // IE & Edge
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari
  },
};

const ShopList = () => {
  const dispatch = useDispatch();
  const { shopsInCity } = useSelector((state) => state.shops);
  const { currentCity } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(fetchShopsInCity({ city: currentCity }));
  }, []);

  return (
    <Stack
      width={{ xs: "100%", md: "80%" }}
      margin="auto"
      direction="row"
      gap={{ xs: 1.7, md: 2.5 }}
      alignItems="center"
      px={{ xs: 1, md: 2 }}
      justifyContent={{ xs: "start", md: "center" }}
      py={3}
      sx={{ overflowX: "auto", ...HIDDEN_SCROLLBAR }}
    >
      {shopsInCity && shopsInCity.length > 0 ? (
        shopsInCity?.map((shop, i) => <ShopCard key={i} shop={shop} />)
      ) : (
        <Typography >
          {" "}
          No Shops found in your city
        </Typography>
      )}
    </Stack>
  );
};

export default ShopList;
