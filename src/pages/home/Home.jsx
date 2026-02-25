import { Stack } from "@mui/material";
import React from "react";
import Hero from "./Hero";
import Menus from "../menu/Menus";
import { AddressCard } from "../../components/address/AddressCard";
import AddressForm from "../../components/address/AddressForm";
import Footer from "../../components/common/Footer";

const Home = () => {
  return (
    <Stack>
      <Hero/>
      <Menus/>
      <Footer/>
    </Stack>
  )
};

export default Home;