import { Stack } from "@mui/material";
import React from "react";
import Hero from "./Hero";
import Menus from "../menu/Menus";
import { AddressCard } from "../../components/address/AddressCard";
import AddressForm from "../../components/address/AddressForm";

const Home = () => {
  return (
    <Stack>
      <Hero/>
      <Menus/>
    </Stack>
  )
};

export default Home;