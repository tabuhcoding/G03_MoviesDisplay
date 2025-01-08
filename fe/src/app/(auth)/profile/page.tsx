'use client'
/* Package System */
import { useRouter } from 'next/navigation';
import { CircularProgress, Avatar } from "@mui/material";
import { User } from "lucide-react";
import { useState } from 'react';

/* Package Application */
import { useAuth } from "@context/authContext";
import "@public/styles/user/profile.css";

const Profile: React.FC = () => {
  const { userInfo: user } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('Favorites');

  if (!user || Object.keys(user).length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }
  const formatDate = (dateString: string) => {
    if (dateString === "") return "";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const renderContent = () => {
    switch (selectedTab) {
    case 'Ratings':
      return (
        <div className="d-flex">
          <div className="p-2">
            <h4>My Ratings</h4>
            <p>You haven&apos;t rated any movies.</p>
          </div>
          <div className="ms-auto p-2 mt-2">
            <div className="d-flex justify-content-end align-items-center">
              <span className="d-inline">Filter by:</span>
              <select className="form-select cus-select" aria-label="Default select example">
                <option selected>Date Rated</option>
                <option value={1}>My Rating</option>
                <option value={2}>Popularity</option>
                <option value={3}>Release Date</option>
              </select>
            </div>
          </div>
        </div>
      );
    case 'Watchlist':
      return (
        <div className="d-flex">
          <div className="p-2">
            <h4>My Watchlist</h4>
            <p>You haven&apos;t  added any movies to your watchlist</p>
          </div>
          <div className="ms-auto p-2 mt-2">
            <div className="d-flex justify-content-end align-items-center">
              <span className="d-inline">Filter by:</span>
              <select className="form-select cus-select" aria-label="Default select example">
                <option selected>Date Rated</option>
                <option value={1}>My Rating</option>
                <option value={2}>Popularity</option>
                <option value={3}>Release Date</option>
              </select>
            </div>
          </div>
        </div>
      );
    case 'Favorites':
    default:
      return (
        <div className="d-flex">
          <div className="p-2">
            <h4>My Lists</h4>
            <p>You haven&apos;t created any lists.</p>
          </div>
          <div className="ms-auto p-2">
            <button type='button' className='btn btn-primary'>Create List</button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className='bg_image'>
      <div className='block header gradient blue'>
        <div className='inner_content'>
          <div className='content'>
            <span className='avatar'>
              <Avatar
                src={user?.avatar ?? undefined}
                alt={user?.username ?? ''}
                onClick={() => router.push("/profile")}
              >
                {!user.avatar && <User size={150} />}
              </Avatar>
            </span>
            <div className='user_info'>
              <div className='about_me'>
                <div className='content_wrapper flex'>
                  <h2>{user.username ?? ''}</h2>
                  <h3>Member since {formatDate(user?.createdAt ?? '')}</h3>
                </div>
                <div className='content_wrapper flex'>
                  <span>Email: {user?.email ?? ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center mt-3">
        <div className="row justify-content-md-center">
          <div className="col col-lg-2 my-list" onClick={() => setSelectedTab('Favorites')}
            style={{ cursor: 'pointer', fontWeight: selectedTab === 'Favorites' ? 'bold' : 'normal' }}>
            Favorites
          </div>
          <div className="col-md-auto my-list" onClick={() => setSelectedTab('Ratings')}
            style={{ cursor: 'pointer', fontWeight: selectedTab === 'Ratings' ? 'bold' : 'normal' }}>
            Ratings
          </div>
          <div className="col col-lg-2 my-list" onClick={() => setSelectedTab('Watchlist')}
            style={{ cursor: 'pointer', fontWeight: selectedTab === 'Watchlist' ? 'bold' : 'normal' }}>
            Watchlist
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='container ml-4 mr-4'>
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
