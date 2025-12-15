import axios from 'axios'
import React, { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'

const useGetMyShop = () => {
  const dispatch = useDispatch()
  const {userData}=useSelector(state=>state.user)

  

  useEffect(() => {

    const fetchMyShop = async () => {
      try {
        const res = await axios.get(`${backendURL}/shop/get`, {
          withCredentials: true,
        })

        dispatch(setMyShopData(res.data.shop))
      } catch (error) {
        console.log(error);
      }
    }
if (userData?.role==="owner") {
  fetchMyShop()
  
}
  }, [])

}

export default useGetMyShop