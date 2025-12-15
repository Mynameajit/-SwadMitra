import React, { useState } from 'react';
import { Dialog, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { backendURL } from '../../App';
import toast from 'react-hot-toast';
import useGetMyShop from '../../hooks/useGetMyShop';
import AddItem from './AddItem';
import EditItem from '../../components/owner/EditItem';
import { setMyShopData } from '../../redux/ownerSlice';
import OwnerItemCard from '../../components/owner/OwnerItemCard';

const OwnerItems = () => {
  const theme = useTheme();
  const { myShopData } = useSelector((state) => state.owner);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isEdit, setIsEdit] = useState(false)
  const [oldData, setOldData] = useState(null)

  const editHandler = async (item) => {
    setIsEdit(true)
    setOldData(item)
  }

  const deleteHandler = async (item) => {
    const isConfirmed = window.confirm(
      `⚠️ Are you sure you want to delete "${item.name}"?\n\nThis action cannot be undone.`
    );
    if (!isConfirmed) return;

    try {
      setLoading(true);

      const res = await axios.delete(`${backendURL}/item/delete/${item._id}`, {
        withCredentials: true
      });

      toast.success(`${item.name} deleted successfully`);
      dispatch(setMyShopData(res.data.shop));

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Always stop loader
    }
  };


  return (
    <Stack
      p={{ xs: 0, md: 0.3 }}
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      {
        isEdit && (
          <Dialog
            open={isEdit}
            fullScreen={isMobile} // 📱 Mobile par full screen
            fullWidth={!isMobile} // 🖥 Desktop par hi width allow
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
            <EditItem setIsEdit={setIsEdit} isEdit={isEdit} item={oldData} />
          </Dialog>
        )
      }
      <Stack
        width="100%"
        height="100%"
        overflow="auto"
        borderRadius="1rem"
        display={"grid"}
        padding={4}
        gap={3.5}
        marginBottom={6}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}


      >



        {myShopData?.items?.map((item, index) => (

          <OwnerItemCard
            i={index + 1}
            key={index}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            item={item}
            shop={myShopData}
            loading={loading}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default OwnerItems;
