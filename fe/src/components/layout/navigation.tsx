"use client"

/* Package System */
import Link from 'next/link';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Avatar, Button } from "@mui/material";
import { User } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

/* Package Application */
import { useAuth } from '@/src/context/authContext';
import "@styles/Navigation.css";

const Navigation: React.FC = () => {
  const { userInfo, isLogin, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    router.push("/profile");
  }

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev); // Toggle dropdown state
  };

  const closeDropdown = () => {
    setDropdownOpen(false); // Close dropdown when clicking outside
  };

  useEffect(() => {
    // Add event listener to close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.dropdown') === null) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          {!isLogin ? (
            <>
              <Link href="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
              <Link href="/register"><button type="button" className="btn btn-signup">Sign-up</button></Link>
            </>
          ) : (
            <div className="dropdown d-flex align-items-center container-profile">
              <Avatar onClick={handleProfileClick} src={userInfo.avatar} alt={userInfo.username} sx={{ width: 40, height: 40, cursor: "pointer" }}>
                {!userInfo.avatar && <User size={40} />}
              </Avatar>
              <a
                href="#"
                className="text-decoration-none dropdown-toggle icon-dropdown"
                onClick={toggleDropdown}
              ></a>
              <ul className={`dropdown-menu text-small shadow ${isDropdownOpen ? 'show' : ''}`}>
                <li><Link href="/profile" className="dropdown-item" style={{textAlign: 'center'}}>My Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Button
                    type="button"
                    className="dropdown-item"
                    onClick={logout}
                  >
                    Sign out
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;