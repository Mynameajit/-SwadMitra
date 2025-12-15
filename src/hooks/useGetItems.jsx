import axios from 'axios'
import React, { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch } from 'react-redux'
import { setItemsData } from '../redux/itemSlice'

const useGetItems = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${backendURL}/item/get`)
            dispatch(setItemsData(res.data.items))
        }
        fetchData()

    }, [])

}

export default useGetItems