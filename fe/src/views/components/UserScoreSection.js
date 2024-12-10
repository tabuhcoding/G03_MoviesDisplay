import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const UserScoreSection = ({ vote_average }) => {
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
            value={(vote_average * 10).toFixed(1)}
            size={70}
            thickness={4}
            sx={{
              color: "#66cc00",
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
              {Number.isInteger(vote_average * 10)
                ? (vote_average * 10)
                : (vote_average * 10).toFixed(1)}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="gray">
          <strong className="text-white">User<br />
            Score
          </strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserScoreSection;