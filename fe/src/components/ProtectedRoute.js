import { Navigate } from "react-router-dom";
import { useUser } from "../helpers/useContext";
import { useFetchUserProfile } from "../helpers/useFetchProfile";

function ProtectedRoute({ children }) {
  const { setUser } = useUser();
  const isAuthorized = useFetchUserProfile(setUser);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
