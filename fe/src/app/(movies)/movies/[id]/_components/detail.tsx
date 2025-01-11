"use client"

/* Package System */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useColor } from "color-thief-react";
import { Button, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Typography } from "@mui/material";
import { Favorite, Bookmark } from "@mui/icons-material";

/* Package Application */
import { useAuth } from '@/src/context/authContext';
import UserScoreSection from "@/src/components/userScoreSection";
import { ReviewSection, ReviewList } from "@/src/components/reviewSection";
import "@public/styles/movie/detail.css";
import { END_POINT_URL_LIST } from "@/src/util/constant";

interface MovieDetailProps {
  movieDetails: {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: { id: string; name: string }[];
    runtime: number;
    vote_average: number;
    tagline: string;
    belongs_to_collection?: {
      backdrop_path?: string;
      poster_path?: string;
    };
  };
}

interface Review {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    username: string;
    rating: number;
  };
  content: string;
  created_at: string;
  update_at: string;
  id: string;
  url: string;
}

const formatDate = (releaseDate: string) => {
  const date = new Date(releaseDate);
  return `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

const formatRunTime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

export default function MovieDetail({ movieDetails }: MovieDetailProps) {
  const router = useRouter();
  const { userInfo: user, isLogin } = useAuth();
  const [bgColor, setBgColor] = useState<string>("rgba(0, 0, 0, 0.6)");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"error" | "success">("success");
  const [isRated, setIsRated] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${movieDetails.id}`);
        const data = await response.json();
        const reviews = data.data.reviews ?? [];
        const currentUserReview = reviews.find((review: Review) => review.author_details.username === user.email);
        setUserReview(currentUserReview ?? null);
        setReviews(data.data.reviews ?? []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [movieDetails.id, user.email]);

  const imageUrl = `https://media.themoviedb.org/t/p/original${movieDetails?.backdrop_path ??
    movieDetails?.poster_path ??
    movieDetails?.belongs_to_collection?.backdrop_path ??
    movieDetails?.belongs_to_collection?.poster_path
  }`;

  const { data: color } = useColor(imageUrl, "rgbArray", {
    crossOrigin: "anonymous",
    quality: 10
  });

  useEffect(() => {
    if (color) {
      setBgColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6)`);
    }
  }, [color]);

  const handleAddToList = async (apiEndPoint: string) => {
    if (!isLogin) {
      setDialogType("error");
      setDialogMessage("You must login to add movie to the list.");
      setDialogOpen(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiEndPoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          movieId: movieDetails.id
        })
      });
      if (response.ok) {
        setIsRated(true);
        setDialogType("success");
        setDialogMessage("Added movie to the list successfully!");
      } else {
        setDialogType("error");
        setDialogMessage("Failed to add movie to the list. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setDialogType("error");
      setDialogMessage("Failed to add movie to the list. Please try again.");
    } finally {
      setDialogOpen(true);
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (dialogType === "error" && !isLogin) {
      router.push("/login");
    }

    if (dialogType === "success" && isRated) {
      router.push(`/movie/${movieDetails.id}`);
    }
  };

  const handleSubmitReview = async (movieId: string, email: string, rating: number, reviews: string) => {
    if (!isLogin) {
      setDialogType("error");
      setDialogMessage("You must login to add movie to the list.");
      setDialogOpen(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${END_POINT_URL_LIST.rating}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          movieId,
          rating,
          reviews
        })
      });
      if (response.ok) {
        setDialogType("success");
        setDialogMessage("Added rating and review successfully!");
      } else {
        setDialogType("error");
        setDialogMessage("Failed to add rating and review. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setDialogType("error");
      setDialogMessage("Failed to add rating and review. Please try again.");
    } finally {
      setDialogOpen(true);
    }
  }

  const handleEditReview = async (
    movieId: string,
    email: string,
    rating: number,
    review: string,
    reviewId: string
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${END_POINT_URL_LIST.rating}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          movieId,
          email,
          rating,
          reviews: review
        })
      });
  
      if (response.ok) {
        console.log("Review updated successfully!");
        window.location.reload();
      } else {
        console.error("Failed to update review.");
      }
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };  

  return (
    <>
      <div
        className="custom-bg"
        // style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/original${movieDetails?.belongs_to_collection?.backdrop_path ?? movieDetails?.belongs_to_collection?.poster_path ?? movieDetails.backdrop_path ?? movieDetails.poster_path})` }}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: bgColor,
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="movie-detail-container mt-5">
          <section className="movie-header">
            <div className="poster-wrapper">
              <Image
                className="movie-poster"
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}
                alt={movieDetails.title}
                width={300}
                height={450}
                priority
              />
            </div>
            <div className="movie-info">
              <section className="info-header">
                <div className="movie-title">
                  <h2 onClick={() => router.push(`/movie/${movieDetails.id}`)} className="movie-title-header">
                    {movieDetails.title}
                    <span className="tag release_date">({new Date(movieDetails.release_date).getFullYear()})</span>
                  </h2>
                  <div className="facts d-flex">
                    <span className="release">{formatDate(movieDetails.release_date)}</span>
                    <span className="genres">{movieDetails.genres.map((genre) => genre.name).join(", ")}</span>
                    <span className="runtime">{formatRunTime(movieDetails.runtime)}</span>
                  </div>
                  <UserScoreSection vote_average={movieDetails.vote_average ?? 0} />

                  {/* Action Buttons */}
                  <div className="movie-actions">
                    <Tooltip
                      title={
                        isLogin
                          ? "Add this movie to your favorite list"
                          : "Login to add this movie to your favorite list"
                      }
                      arrow
                    >
                      <IconButton onClick={() => handleAddToList(END_POINT_URL_LIST.favorite)} className="movie-actions__item">
                        <Favorite />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        isLogin
                          ? "Add this movie to your watch list"
                          : "Login to add this movie to your watch list"
                      }
                      arrow
                    >
                      <IconButton onClick={() => handleAddToList(END_POINT_URL_LIST.watchlist)} className="movie-actions__item">
                        <Bookmark />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                <div className="header-info">
                  <h3 className="tagline" dir="auto">{movieDetails.tagline}</h3>
                  <h3 className="h3-overview" dir="auto">Overview</h3>
                  <div className="overview">
                    <p>{movieDetails.overview}</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>

      {loadingReviews ? (
        <div className="loading-container">
          <CircularProgress sx={{ color: "#1976d2" }} />
        </div>
      ) : (
        <>
          {userReview ? (
            <div className="user-review-container">
              <div className="user-review-info">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    padding: "10px 10px"
                  }}>
                  Reviews
                </Typography>
              </div>
              <ReviewList
                reviews={[userReview]}
                currentUserEmail={user.email}
                onEdit={(review) => {
                  setUserReview(review);
                  setIsEditing(!isEditing);
                }}
              />
            </div>
          ) : (
            !isEditing && (
              <ReviewSection movieId={movieDetails.id} email={user.email} onSubmit={handleSubmitReview} />
            )
          )}

          {isEditing && userReview && (
            <ReviewSection
              movieId={movieDetails.id}
              email={user.email}
              onSubmit={(movieId, email, rating, review) => {
                handleEditReview(movieId, email, rating, review, userReview.id);
                setIsEditing(!isEditing);
              }}
            />
          )}

          <ReviewList
            reviews={reviews.filter((review) => review.id !== userReview?.id)}
            currentUserEmail={user.email}
            onEdit={(review) => {
              setUserReview(review);
              setIsEditing(!isEditing);
            }}
          />
        </>
      )}

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            borderRadius: "10px",
            maxWidth: "400px",
            width: "100%"
          }
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: dialogType === "error" ? "#f48fb1" : "#032541",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "18px"
          }}
        >
          {dialogType === "error" ? "Error" : "Success"}
        </DialogTitle>

        <div
          style={{
            borderBottom: "1px solid #ccc",
            margin: "0 10px"
          }}
        ></div>

        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              fontSize: "16px",
              color: "#555",
              margin: "10px 0"
            }}
          >
            {dialogMessage}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            paddingBottom: "10px"
          }}
        >
          {dialogType === "error" && !isLogin ? (
            <Button
              onClick={() => router.push("/login")}
              sx={{
                backgroundColor: "#f44336",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#d32f2f"
                },
                textTransform: "none",
                fontWeight: "bold",
                padding: "8px 20px",
                borderRadius: "5px"
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleDialogClose}
              sx={{
                backgroundColor: "#66bb6a",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#388e3c"
                },
                textTransform: "none",
                fontWeight: "bold",
                padding: "8px 20px",
                borderRadius: "5px"
              }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}