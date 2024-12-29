"use client"
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/src/context/authContext";

export const InitUser = ({token}: {token:string}) => {
  const { login, logout, isLogin} = useAuth();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLogin || !token) {
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
          {
            withCredentials: true, // Để gửi cookie trong request
            headers: {
              Authorization: `Bearer ${token}`            
            }
          }
        );
        login(response.data.user);
        console.log("User profile:", response.data);
      } catch (error) {
        logout();
        console.error("Failed to fetch user profile:", error);
      } finally {
        return
      }
    };

    fetchUserProfile();
  }, [token, isLogin, login, logout]);

  return (<></>);
};
