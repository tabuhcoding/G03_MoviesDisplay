import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setCookie } from "../../helpers/cookies";
import { useUser } from "../../helpers/useContext";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [message, setMessage] = useState('Processing your login...')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = JSON.parse(decodeURIComponent(params.get("user")));
    if (token && user) {
      setCookie("token", token, 7);
      setUser(user);
      setMessage('Login successful. Redirecting to profile page...')
      setTimeout(() => {
        navigate("/");
      }, 2000)
    } else {
      setMessage('Login failed. Redirecting to login page...')
      setTimeout(() => {
        navigate("/login");
      }, 2000)
    }
  }, [navigate, setUser]);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Login Status</h1>
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    </>
  )
}