"use client"

/* Package System */
import { useState, FC } from "react";
import { Button, Slider, Typography, TextField, Tooltip, IconButton } from "@mui/material";

/* Package Application */
import "@public/styles/movie/reviews.css";
import { Edit } from "lucide-react";

interface ReviewSectionProps {
  movieId: string;
  email: string;
  onSubmit: (movieId: string, email: string, rating: number, review: string) => void;
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

const ReviewSection: FC<ReviewSectionProps> = ({ movieId, email, onSubmit }) => {
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number | 0>(0);

  const handleSubmit = () => {
    if (review !== "" && rating !== 0) {
      onSubmit(movieId, email, rating, review);
    }
  }

  return (
    <div
      className="review-section"
      style={{
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "10px"
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "10px", fontWeight: "bold", color: "#333" }}
      >
        Leave a Review and Rating
      </Typography>
      <Slider
        value={rating}
        onChange={(e, newValue) => setRating(newValue as number)}
        aria-label="Rating"
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay="auto"
        sx={{
          marginBottom: "20px",
          color: "#1976d2",
          '& .MuiSlider-thumb': {
            color: "#ff9800",
            '&:hover, &:focus, &.Mui-active': {
              boxShadow: "0px 0px 8px rgba(255, 152, 0, 0.8)"
            }
          },
          '& .MuiSlider-track': {
            color: "#ff9800"
          },
          '& .MuiSlider-rail': {
            color: "#ccc"
          }
        }}
      />
      <TextField
        label="Your Review"
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        disabled={!rating || !review}
        onClick={handleSubmit}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          width: "100px",
          alignSelf: "center",
          backgroundColor: "#032541",
          '&:hover': {
            backgroundColor: "#1976d2",
            color: "#fff"
          }
        }}
      >
        Rate
      </Button>
    </div>
  );
};

export const ReviewList: FC<{ reviews: Review[]; currentUserEmail: string; onEdit?: (review: Review) => void }> = ({ reviews, currentUserEmail, onEdit }) => {
  const MAX_CONTENT_LENGTH = 100;
  const [expandedReviewIds, setExpandedReviewIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((reviewId) => reviewId !== id) : [...prev, id]
    );
  };

  return (
    <div className="review-list">
      {reviews.map((review) => {
        const isExpanded = expandedReviewIds.includes(review.id);
        const content =
          review.content.length > MAX_CONTENT_LENGTH && !isExpanded
            ? review.content.slice(0, MAX_CONTENT_LENGTH) + "..."
            : review.content;

        return (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <img
                src={review.author_details.avatar_path || "https://res.cloudinary.com/de66mx8mw/image/upload/v1736666809/default-avatar-icon-of-social-media-user-vector.jpg.jpg"}
                alt={review.author_details.name}
                className="avatar"
              />
              <div className="user-info">
                <strong>{review.author_details.name}</strong>
                <p className="rating">Rating: {review.author_details.rating}/10</p>
              </div>
              {review.author_details.username === currentUserEmail && (
                <Tooltip title="Edit Review" arrow>
                  <IconButton
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      "&:hover": { backgroundColor: "#e3f2fd" },
                      marginTop: "10px"
                    }}
                    onClick={() => onEdit && onEdit(review)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <div className="review-content">
              <p>{content}</p>
              {review.content.length > MAX_CONTENT_LENGTH && (
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="see-more-button"
                >
                  {isExpanded ? "Ẩn bớt" : "Xem thêm"}
                </button>
              )}
            </div>
            <div className="review-footer">
              <small>{new Date(review.update_at).toLocaleString()}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { ReviewSection };