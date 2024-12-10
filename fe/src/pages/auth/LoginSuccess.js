import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setCookie } from "../../helpers/cookies";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processing your login...')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setCookie("token", token, 7);
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
  }, [navigate]);
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