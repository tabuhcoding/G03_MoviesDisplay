import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

// Định nghĩa type cho props
interface UserScoreSectionProps {
  vote_average: number;
}

const UserScoreSection: React.FC<UserScoreSectionProps> = ({ vote_average }) => {
  // Tính toán phần trăm điểm
  const score = Math.round(vote_average * 10) || 0;

  // Định màu sắc dựa trên điểm số
  const getColor = (score: number) => {
    // if (score >= 70) return "#66cc00";  // Xanh lá cây
    // if (score >= 50) return "#ffa500";  // Màu cam
    // return "#ff3d00";                   // Đỏ
    return "#66cc00";
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "transparent",
        padding: 2,
        borderRadius: 2,
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={score}
            size={70}
            thickness={4}
            sx={{
              color: getColor(score),
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Typography variant="caption" component="div" fontSize={12}>
              {score}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="gray">
          <strong className="text-white">
            User<br />
            Score
          </strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserScoreSection;