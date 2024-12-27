"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/src/context/authContext';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ id: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLogin } = useAuth();

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

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image.');
      setResult(null);
    }
  };

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

export default UploadPage;
