import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../helpers/cookies";
import { useUser } from "../helpers/useContext";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { user, setUser } = useUser(); // Truy cập context
  const token = getCookie("token");

  useEffect(() => {
    const checkProfile = async () => {
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

    if (!user) checkProfile();
    else setIsAuthorized(true); // Nếu đã có user, không cần gọi lại
  }, [token, user, setUser]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
