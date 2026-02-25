import React from "react";
import {
  burger,
  cake,
  dessert,
  drink,
  fastFood,
  noodles,
  pasta,
  pizza,
  sandwich,
  snacks,
} from "../../utils/imageData";
import CategoryCard from "./CategoryCard";
import { Stack } from "@mui/material";

// Categories - kept same as before
export const categories = [
  { id: 1, name: "Snacks", image: snacks },
  { id: 2, name: "Sandwich", image: sandwich },
  { id: 3, name: "Desserts", image: dessert },
  { id: 4, name: "Drinks", image: drink },
  { id: 5, name: "Fast Food", image: fastFood },
  { id: 6, name: "Cake", image: cake },
  { id: 7, name: "Pasta", image: pasta },
  { id: 8, name: "Noodles", image: noodles },
  { id: 9, name: "Pizza", image: pizza },
  { id: 10, name: "Burgers", image: burger },
];

export const HIDDEN_SCROLLBAR = {
  msOverflowStyle: "none", // IE & Edge
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari
  },
};

const CategoryList = () => {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
        px: 2,
        py: 2,
        justifyContent:{ xs: "start", md: "center" },

        // 🔥 smooth scrolling
        scrollBehavior: "smooth",

        // 🔥 scrollbar hide
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {categories.map((cat, index) => (
        <CategoryCard key={cat.id} category={cat} index={index} />
      ))}
    </Stack>
  );
};

export default CategoryList;
