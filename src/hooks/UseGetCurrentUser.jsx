import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch=useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendURL}/user/me`, {
          withCredentials: true, 
        });
        dispatch(setUserData(res.data.user))
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // return { user, loading, error };
};

export default useGetCurrentUser;
