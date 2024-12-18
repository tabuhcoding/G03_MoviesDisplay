import Link from 'next/link';
// import { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { Avatar } from "@mui/material";
// import { User } from "lucide-react";
// import { UserContext } from "../../context/UserContext";
import "@styles/Navigation.css";

const Navigation: React.FC = () => {
  // const { user } = useContext(UserContext);
  return (
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
              <Link href="/" className="nav-link" style={{ color: "white" }}>Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link href="#" className="nav-link dropdown-toggle" role="button" aria-expanded="false" style={{ color: "white" }}>
                Movies
              </Link>
              <ul className="dropdown-menu">
                <li><Link href="/movies/popular" className="dropdown-item">Popular</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="/movies/now-playing" className="dropdown-item">Now playing</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="/movies/upcoming" className="dropdown-item">Upcoming</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="/movies/top-rated" className="dropdown-item">Top Rated</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="text-end">
          {/* {!user ? (
            <>
              <Link href="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
              <Link href="/register"><button type="button" className="btn btn-signup">Sign-up</button></Link>
            </>
          ) : (
            <div className="dropdown d-flex align-items-center container-profile">
              <Avatar src={user.avatar} alt={user.username} sx={{ width: 40, height: 40 }}>
                {!user.avatar && <User size={40} />}
              </Avatar>
              <a href="#" className="link-dark text-decoration-none dropdown-toggle icon-dropdown" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false"></a>
              <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style={{ transform: "translateX(-20px)" }}>
                <li><Link href="/profile" className="dropdown-item">Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="/logout" className="dropdown-item">Sign out</Link></li>
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;