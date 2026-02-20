import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CategoryList from "../../components/menu/CategoryList";
import ShopList from "../../components/menu/ShopList";
import MenuLoader from "../../components/menu/MenuLoader";
import MenuCard from "../../components/menu/MenuCard";

import { fetchMenus } from "../../features/menu/MenuService";
import { AddToCart } from "../../features/cart/cartService";

const Menus = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { menus, page, totalPage, loading, limit, isFetchingMore, hasMore } =
    useSelector((state) => state.menus);

  const currentCity = "deoghar";
  const [selectId, setSelectId] = useState(null);

  const hasFetchedOnce = useRef(false);
  const isFetching = useRef(false);

  // ✅ first time load (12 menus)
  useEffect(() => {
    if (!hasFetchedOnce.current) {
      hasFetchedOnce.current = true;
      dispatch(fetchMenus({ page: 1, limit: 12 }));
    }
  }, [dispatch]);

  // ✅ sync ref
  useEffect(() => {
    isFetching.current = isFetchingMore;
  }, [isFetchingMore]);

  // ✅ infinite pagination scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // stop conditions
      if (
        loading ||
        isFetching.current ||
        !hasMore ||
        page >= totalPage ||
        fullHeight <= windowHeight
      ) {
        return;
      }

      // bottom reached
      if (scrollTop + windowHeight + 80 >= fullHeight) {
        isFetching.current = true;
        dispatch(fetchMenus({ page: page + 1, limit: 12 }));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, page, totalPage, loading, hasMore]);

  // ====================== Add cart the items ===============
  const handelAddCart = async (item, qty) => {
    setSelectId(item._id);
    await dispatch(AddToCart({ item, qty })).unwrap();
    setSelectId(null);
  };


  if ( loading && page === 1 ){
    return <MenuLoader/>
    
  }

  return (
    <Stack
      width="100%"
      minHeight="100vh"
      style={{
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography
        textAlign="center"
        sx={{
          fontWeight: { xs: 700, md: 900 },
          color: "#FF1100",
          fontSize: { xs: "1.4rem", md: "2rem" },
          mb: 1,
        }}
      >
        Explore Delicious Categories
      </Typography>

      <CategoryList />

        <Typography
          textAlign="center"
          sx={{
            fontWeight: { xs: 700, md: 900 },
            color: "#FF1100",
            fontSize: { xs: "1.4rem", md: "2rem" },
            mt: 0,
          }}
        >
          Best Food Shop for {currentCity || "your city"}
        </Typography>

        <ShopList />

        {/* ✅ Menus Grid */}
        <Stack
          width="94%"
          marginX="auto"
          borderRadius="1rem"
          display="grid"
          padding={{ xs: 1, md: 1 }}
          gap={3}
          mt={1}
          marginBottom={2}
          sx={{
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {menus?.map((menu, i) => (
            <MenuCard
              key={menu._id || i}
              item={menu}
              handelAddCart={handelAddCart}
              loading={loading}
              selectId={selectId}
            />
          ))}
        </Stack>

        {/* ✅ Bottom circular loader */}
        <Stack alignItems="center" justifyContent="center" py={8}>
          {isFetchingMore && <CircularProgress size={32} />}
          {!hasMore && menus?.length > 0 && (
            <Typography sx={{ mt: 1, opacity: 0.7 }}>
              ✅ All menus loaded
            </Typography>
          )}
        </Stack>
    </Stack>
  );
};

export default Menus;
