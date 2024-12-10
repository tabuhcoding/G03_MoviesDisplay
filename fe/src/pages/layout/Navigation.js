import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';

const Navigation = () => {
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleSearch = () => {
        navigate(`/movies/search?query=${searchInput}&page=1`);
    }

    return (
        <header>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#032541' }}>
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
                                <a className="nav-link" aria-current="page" href="/" style={{ color: 'white' }}>
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
                                    style={{ color: 'white' }}
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
                        <button type="button" className="btn btn-outline-light me-2" onClick={handleLogin}>
                            Login
                        </button>
                        <button type="button" className="btn" onClick={handleRegister}
                            style={{ background: 'linear-gradient(to right, rgb(30, 213, 169), rgb(1, 180, 228))', color: 'white' }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'linear-gradient(to right, rgb(30, 213, 169), rgb(1, 180, 228))';
                                e.target.style.color = '#01647e';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'linear-gradient(to right, rgba(30, 213, 169), rgba(1, 180, 228))';
                                e.target.style.color = '#fff';
                            }}
                        >
                            Sign-up
                        </button>
                        {/* <i className="fas fa-search ml-2" style={{color: 'rgb(1 180 228)'}}/> */}

                        {/* Đăng nhập thành công */}
                        {/* <div className="flex-shrink-0 dropdown">
                            <a
                                href="#"
                                className="d-block link-dark text-decoration-none dropdown-toggle"
                                id="dropdownUser2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{color: 'white'}}
                            >
                                <img
                                    src="https://github.com/mdo.png"
                                    alt="mdo"
                                    width={32}
                                    height={32}
                                    className="rounded-circle"
                                />
                            </a>
                            <ul
                                className="dropdown-menu text-small shadow"
                                aria-labelledby="dropdownUser2"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </nav>
            {/* Navbar */}
            {/* Background image */}
            <div
                className="p-5 text-center bg-image"
                style={{
                    backgroundImage:
                        'url(../../bg-nav.jpg)',
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 400,
                    marginTop: 56
                }}
            >
                <div className="mask"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">Welcome</h1>
                            <h4 className="mb-3">Millions of movies, TV shows and people to discover. Explore now.</h4>
                            <form className="d-flex" role="search" onSubmit={handleSearch}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-light btn-lg"
                                    style={{
                                        background: 'linear-gradient(to right, rgba(30, 213, 169, 0.7), rgba(1, 180, 228, 0.7))',
                                        color: '#fff',
                                        border: 'none',
                                        transition: 'background 0.5s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'linear-gradient(to right, rgb(30, 213, 169), rgb(1, 180, 228))';
                                        e.target.style.color = '#01647e';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'linear-gradient(to right, rgba(30, 213, 169, 0.7), rgba(1, 180, 228, 0.7))';
                                        e.target.style.color = '#fff';
                                    }}
                                >
                                    Search
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background image */}
        </header>
    );
}

export default Navigation;