import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";

const MotionStack = motion(Stack);

const CategoryCard = ({ category, index }) => {
  return (
    <MotionStack
      height={{xs:"4rem",md:"5rem"}}
      width={{xs:"4rem",md:"5rem"}}
      borderRadius="50%"
      flexShrink={0} 
     
      sx={{
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={category.image}
        alt={category.name}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          transition: "0.3s ease",
        }}
      />
    </MotionStack>
  );
};

export default CategoryCard;
