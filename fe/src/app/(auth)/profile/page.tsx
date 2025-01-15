'use client';

/* Package System */
import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, CircularProgress } from "@mui/material";
import { User } from "lucide-react";
import axios from 'axios';

/* Package Application */
import { useAuth } from "@context/authContext";
import "@public/styles/user/profile.css";
import { END_POINT_URL_LIST } from '@/src/util/constant';
import { AvatarUploadDialog } from './_component/avatarDialog';
import { formatDateToMonthYYYY } from '@/src/util/helpers';
import MovieCard from '../../(movies)/movies/[id]/_components/moviesCard';
import RatingsList from './_component/ratingList';

export default function Profile() {
  const { userInfo: user, isLogin, login } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('Favorites');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoadingFavorites, setLoadingFavorites] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [isLoadingWatchlist, setLoadingWatchlist] = useState<boolean>(false);
  const [ratings, setRatings] = useState<any[]>([]);
  const [isLoadingRatings, setIsLoadingRatings] = useState<boolean>(false);

  const sortMovies = useCallback(async (sortOrder: string, setState: Dispatch<SetStateAction<any[]>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
    const list = selectedTab === 'Favorites' ? favorites : watchlist;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (sortOrder) {
    case 'popularity.desc':
      setState([...list].sort((a, b) => b.popularity - a.popularity));
      break;
    case 'popularity.asc':
      setState([...list].sort((a, b) => a.popularity - b.popularity));
      break;
    case 'created_at.asc':
      setState([...list].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      break;
    case 'created_at.desc':
      setState([...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      break;
    default:
      break;
    }
    setLoading(false);
  }, [selectedTab, favorites, watchlist]);

  const sortRatings = useCallback(async (sortOrder: string) => {
    setIsLoadingRatings(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (sortOrder) {
    case 'created_at.desc':
      setRatings([...ratings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      break;
    case 'created_at.asc':
      setRatings([...ratings].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      break;
    case 'rating.desc':
      setRatings([...ratings].sort((a, b) => b.rating - a.rating));
      break;
    case 'rating.asc':
      setRatings([...ratings].sort((a, b) => a.rating - b.rating));
      break;
    default:
      break;
    }
    setIsLoadingRatings(false);
  }, [ratings]);

  const handleSortRatingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    sortRatings(e.target.value);
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    sortMovies(e.target.value, selectedTab === 'Favorites' ? setFavorites : setWatchlist, selectedTab === 'Favorites' ? setLoadingFavorites : setLoadingWatchlist);
  }

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, router]);

  useEffect(() => {
    const fetchList = async (email: string, apiEndPoint: string, setState: Dispatch<SetStateAction<any[]>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiEndPoint}?email=${email}`);
        setState(response.data.data ?? []);
      } catch (err) {
        console.error('Error fetching list:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTab === 'Favorites') {
      fetchList(user.email, END_POINT_URL_LIST.favorite, setFavorites, setLoadingFavorites);
    }
    else if (selectedTab === 'Watchlist') {
      fetchList(user.email, END_POINT_URL_LIST.watchlist, setWatchlist, setLoadingWatchlist);
    }
  }, [selectedTab, user.email]);

  useEffect(() => {
    const fetchRatings = async (email: string) => {
      setIsLoadingRatings(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${END_POINT_URL_LIST.rating}?email=${email}`);
        const fetchedRatings = response.data.data ?? [];
        const sortedRatings = fetchedRatings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRatings(sortedRatings);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      } finally {
        setIsLoadingRatings(false);
      }
    }

    if (selectedTab === 'Ratings') {
      fetchRatings(user.email);
    }
  }, [selectedTab, user.email]);

  if (!user || Object.keys(user).length === 0) {
    return null; // Hiển thị trống trong khi chờ chuyển hướng
  }

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
        <>
          <div className="d-flex">
            <div className="p-2">
              <h4>My Ratings</h4>
            </div>
            <div className="ms-auto p-2 mt-2">
              <div className="d-flex justify-content-end align-items-center">
                <span className="d-inline">Sort by:</span>
                <select 
                  className="form-select cus-select"
                  aria-label="Default select example"
                  onChange={handleSortRatingChange}
                >
                  <option value="created_at.desc">Rated Date Descending</option>
                  <option value="created_at.asc">Rated Date Ascending</option>
                  <option value="rating.desc">Rating Descending</option>
                  <option value="rating.asc">Rating Ascending</option>
                </select>
              </div>
            </div>
          </div>
          {isLoadingRatings ? (
            <div className="loading-container">
              <CircularProgress sx={{ color: "#1976d2" }} />
            </div>
          ) : ratings.length > 0 ? (
            <RatingsList ratings = {ratings} />
          ) : (
            <p>You haven&apos;t rated any movies.</p>
          )}
        </>
      );
    case 'Watchlist':
      return (
        <>
          <div className="d-flex">
            <div className="p-2">
              <h4>My Watchlist</h4>
            </div>
            <div className="ms-auto p-2 mt-2">
              <div className="d-flex justify-content-end align-items-center">
                <span className="d-inline">Sort by:</span>
                <select
                  className="form-select cus-select"
                  onChange={handleSortChange}
                >
                  <option value="popularity.desc">Popularity Descending</option>
                  <option value="popularity.asc">Popularity Ascending</option>
                  <option value="created_at.asc">Added Date Ascending</option>
                  <option value="created_at.desc">Added Date Descending</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{marginBottom:'10px'}} className="white_column">
            <section id="media_results" className="panel results movie-list-container">
              {isLoadingWatchlist ? (
                <div className="loading-container">
                  <CircularProgress sx={{ color: "#1976d2" }} />
                </div>
              ) : (
                <div className="movie-list d-flex flex-wrap">
                  <MovieCard movies={watchlist}  emptyMessage='You haven&apos;t added any movies to your watchlist.'/>
                </div>
              )}
            </section>
          </div>
        </>
      );
    case 'Favorites':
    default:
      return (
        <>
          <div className="d-flex">
            <div className="p-2">
              <h4>My Favorite List</h4>
            </div>
            <div className="ms-auto p-2 mt-2">
              <div className="d-flex justify-content-end align-items-center">
                <span className="d-inline">Sort by:</span>
                <select
                  className="form-select cus-select"
                  onChange={handleSortChange}
                >
                  <option value="popularity.desc">Popularity Descending</option>
                  <option value="popularity.asc">Popularity Ascending</option>
                  <option value="created_at.asc">Added Date Ascending</option>
                  <option value="created_at.desc">Added Date Descending</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{marginBottom:'10px'}} className="white_column">
            <section id="media_results" className="panel results movie-list-container">
              {isLoadingFavorites ? (
                <div className="loading-container">
                  <CircularProgress sx={{ color: "#1976d2" }} />
                </div>
              ) : (
                <div className="movie-list d-flex flex-wrap">
                  <MovieCard movies={favorites}  emptyMessage='You haven&apos;t added any movies to your watchlist.'/>
                </div>
              )}
            </section>
          </div>
        </>
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
              <div style={{marginLeft:'100px'}} className='about_me'>
                <div className='content_wrapper flex'>
                  <h2>{user.username ?? ''}</h2>
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