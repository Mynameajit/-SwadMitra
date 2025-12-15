import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState } from '../redux/userSlice'
import { backendURL } from '../App'
import axios from 'axios'
import { setLat, setLog } from '../redux/mapSlice'

const useGetCity = () => {
    const apikey = import.meta.env.VITE_GEOAPIFY_API_KEY
    const disPatch = useDispatch()
    const { userData } = useSelector((state) => state.user)


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            disPatch(setLat(latitude))
            disPatch(setLog(longitude))

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
            disPatch(setCurrentCity(result?.data?.results[0]?.city))
            disPatch(setCurrentState(result?.data?.results[0]?.state))
            disPatch(setCurrentAddress(result?.data?.results[0]?.address_line1 + ", " + result?.data?.results[0]?.address_line2))

        })
    }, [userData, apikey, disPatch])


}

export default useGetCity