"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/src/context/authContext';
import { END_POINT_URL_LIST } from '@/src/util/constant';

export default function UploadPage(){
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ id: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLogin, userInfo, login } = useAuth();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    if (!isLogin) {
      setError('Please login to upload image.');
      return;
    }

    const formData = new FormData();
    formData.append('img_file', file);
    formData.append('email', userInfo.email);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.IMAGE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image.');
      setResult(null);
    }

  };

  const handleUploadAvatar = async () => {
    if (!result) {
      setError('Please upload an image first.');
      return;
    }

    try {
      try {
        const response = await fetch(END_POINT_URL_LIST.V2_UPDATE_AVATAR,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, img_file: result.url })
        });
        if (!response.ok) {
          throw new Error('Failed to upload image.');
        }
        const user = await response.json();
        login(user);
        setError(null);
      } catch (err: any) {
        console.error('Error uploading image:', err);
        setError(err.response?.data?.message || 'Failed to upload image.');
      }
    } catch (err: any) {
      console.error('Error updating avatar:', err);
      setError(err.response?.data?.message || 'Failed to update avatar.');
      setResult(null);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
      >
        Upload
      </button>
      <button
        onClick={handleUploadAvatar}
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
      >
        Upload Avatar
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Upload Result</h2>
          <p>
            <strong>ID:</strong> {result.id}
          </p>
          <p>
            <strong>URL:</strong>{' '}
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.url}
            </a>
          </p>
          <p>
            <img src={result.url} alt="Uploaded Image" style={{ maxWidth: '100%' }} />
          </p>
        </div>
      )}
    </div>
  );
};