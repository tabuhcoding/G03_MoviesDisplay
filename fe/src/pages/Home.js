import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Card, CardContent, CardHeader } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './layout/Footer';
import Navigation from './layout/Navigation';
import "../style/Homepage.css";

export default function Home() {

  const [active, setActive] = useState("today");

  return (
    <>
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
          <CardHeader
            title="Welcome to 21120041-50-76's App"
            subheader="There are our G02 projects"
            sx={{ textAlign: 'center' }}
          />
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>Login</Button>
              <Button variant="outlined" color="primary" onClick={handleRegister} fullWidth>Register</Button>
            </div>
          </CardContent>
        </Card>
      </div> */}

      <div className="d-flex flex-column min-vh-100">
        <Navigation></Navigation>

        <div className="container my-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Trending</h5>
            {/* Toggle Switch Component */}
            <div className="toggle-switch">
              <button
                className={`toggle-btn ${active === "today" ? "active" : ""}`}
                onClick={() => setActive("today")}
              >
                Today
              </button>
              <button
                className={`toggle-btn ${active === "week" ? "active" : ""}`}
                onClick={() => setActive("week")}
              >
                This Week
              </button>
            </div>
          </div>

          {/* Movies list */}
          <div className="card-group card-group-scroll my-3">
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                className="card-img-top"
                alt="Hollywood Sign on The Hill"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                className="card-img-top"
                alt="Palm Springs Road"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This card has supporting
                </p>
              </div>
              
            </div>
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                className="card-img-top"
                alt="Los Angeles Skyscrapers"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card 
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                className="card-img-top"
                alt="Hollywood Sign on The Hill"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/045.webp"
                className="card-img-top"
                alt="Palm Springs Road"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This card has supporting
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp"
                className="card-img-top"
                alt="Los Angeles Skyscrapers"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider 
                </p>
              </div>
            </div>
          </div>

        </div>

        <Footer></Footer>
      </div>

    </>
  );
}
