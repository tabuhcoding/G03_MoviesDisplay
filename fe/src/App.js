import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import LoginSuccess from "./pages/LoginSuccess";
import Movies from "./pages/Movies";
import SearchPage from "./pages/movies/SearchMovies";
import { UserProvider } from "./helpers/useContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
