import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from "../../helpers/useContext";
import { Avatar } from "@mui/material";
import { User } from "lucide-react";

const Navigation = () => {
  const { user } = useUser(); // Lấy user từ context
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#032541" }}>
        <div className="container-fluid">
          <button
            data-mdb-collapse-init=""
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page" href="/" style={{ color: "white" }}>
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  Movies
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Popular
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Now playing
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Upcoming
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Top Rated
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="text-end">
            {!user && (
              <>
                <button type="button" className="btn btn-outline-light me-2" onClick={handleLogin}>
                  Login
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handleRegister}
                  style={{
                    background: "linear-gradient(to right, rgb(30, 213, 169), rgb(1, 180, 228))",
                    color: "white",
                  }}
                >
                  Sign-up
                </button>
              </>
            )}
            {user && (
              <>
                {/* <i className="fas fa-search ml-2" style={{ color: "rgb(1 180 228)" }} /> */}
                <div className="flex-shrink-0 dropdown">
                  <a
                    href="/"
                    className="d-block link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "white" }}
                  >
                    <Avatar
                        src={user.avatar}
                        alt={user.username}
                        sx={{ width: 40, height: 40, margin: '0 auto' }}
                        >
                        {!user.avatar && <User size={40} />}
                    </Avatar>
                  </a>
                  <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/logout">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
