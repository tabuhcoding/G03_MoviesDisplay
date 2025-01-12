'use client';

/* Package System */
import React, { useState, FC } from 'react';

/* Package Application */
import { formatIsoStringToDDMMYYYY } from '../../../../util/helpers';

interface Rating {
  title: string;
  poster_path: string;
  id: string;
  rating: number;
  reviews: string;
  createdAt: string;
}

interface RatingsListProps {
  ratings: Rating[];
  onEdit?: (rating: Rating) => void;
}

const RatingsList: FC<RatingsListProps> = ({ ratings }) => {
  const MAX_CONTENT_LENGTH = 100;
  const [expandedRatingIds, setExpandedRatingIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedRatingIds((prev) =>
      prev.includes(id) ? prev.filter((ratingId) => ratingId !== id) : [...prev, id]
    );
  };

  return (
    <div className="rating-list">
      {ratings.map((rating) => {
        const isExpanded = expandedRatingIds.includes(rating.id);
        const content =
          rating.reviews.length > MAX_CONTENT_LENGTH && !isExpanded
            ? rating.reviews.slice(0, MAX_CONTENT_LENGTH) + "..."
            : rating.reviews;

        return (
          <div key={rating.id} className="rating-item">
            <div className="rating-header">
              <img
                src={
                  rating.poster_path
                    ? `https://image.tmdb.org/t/p/w500${rating.poster_path}`
                    : "https://via.placeholder.com/150"
                }
                alt={rating.title}
                className="movie-poster-profile"
              />
              <div className="movie-info-profile">
                <strong>{rating.title}</strong>
                <p className="rating-score">Rating: {rating.rating}/10</p>
                <p><strong>Reviews: </strong>{content}</p>
                {rating.reviews.length > MAX_CONTENT_LENGTH && (
                  <button
                    onClick={() => toggleExpand(rating.id)}
                    className="see-more-button"
                  >
                    {isExpanded ? "Hide" : "Read More"}
                  </button>
                )}
                <small>{formatIsoStringToDDMMYYYY(rating.createdAt)}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingsList;