import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "./cookies";

export function useFetchUserProfile(setUser) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = getCookie("token");

    const fetchProfile = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 && response.data.user) {
          setUser(response.data.user); // Lưu user vào context
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthorized(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  return isAuthorized;
}
