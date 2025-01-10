'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from "@mui/material";
import { User } from "lucide-react";
import { useAuth } from "@context/authContext";
import "@public/styles/user/profile.css";
import axios from 'axios';
import { END_POINT_URL_LIST } from '@/src/util/constant';
import { AvatarUploadDialog } from './_component/avatarDialog';

export default function Profile() {
  const { userInfo: user, isLogin, login } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('Favorites');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, router]);

  if (!user || Object.keys(user).length === 0) {
    return null; // Hiển thị trống trong khi chờ chuyển hướng
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleUpload = async (selectedFile: File) => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('img_file', selectedFile);
    formData.append('email', user.email);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.IMAGE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPreviewUrl(response.data.data.url);
      setError(null);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image.');
    }
  };

  const handleSave = async () => {
    if (!previewUrl) {
      setError('Please upload an image first.');
      return;
    }

    try {
      const response = await fetch(END_POINT_URL_LIST.V2_UPDATE_AVATAR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, img_file: previewUrl })
      });
      if (!response.ok) {
        throw new Error('Failed to update avatar.');
      }
      const updatedUser = await response.json();
      login(updatedUser);
      setError(null);
      setIsDialogOpen(false);
    } catch (err: any) {
      console.error('Error updating avatar:', err);
      setError(err.message || 'Failed to update avatar.');
    }
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
            <p>You haven&apos;t added any movies to your watchlist</p>
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
  };

  return (
    <div className='bg_image'>
      <div className='block header gradient blue'>
        <div className='inner_content'>
          <div className='content'>
            <span className='avatar'>
              <Avatar
                src={user?.avatar ?? undefined}
                alt={user?.username ?? ''}
                onClick={() => setIsDialogOpen(true)}
                style={{ cursor: 'pointer' }}
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
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
      <AvatarUploadDialog 
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={user}
        onUpload={handleUpload}
        onSave={handleSave}
      />
    </div>
  );
}