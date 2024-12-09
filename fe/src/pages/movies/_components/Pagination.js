import React from "react";
import { Button, Box } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 10;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      // If total pages <= maxPagesToShow, display all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Dynamic range logic
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      // Ensure startPage doesn't go below 1
      if (endPage - startPage + 1 < maxPagesToShow) {
        pages.push(...Array.from({ length: maxPagesToShow }, (_, i) => i + Math.max(1, endPage - maxPagesToShow + 1)));
      } else {
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }

      // Add first and last pages if necessary
      if (startPage > 1) pages.unshift(1, '...');
      if (endPage < totalPages) pages.push('...', totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box
      component="nav"
      aria-label="Page navigation"
      display="flex"
      justifyContent="center"
      mt={4}
    >
      <Box
        component="ul"
        display="flex"
        alignItems="center"
        gap={1}
        p={0}
        m={0}
        style={{ listStyle: "none" }}
      >
        {/* Previous Button */}
        <li>
          <Button
            variant="outlined"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &laquo;
          </Button>
        </li>

        {/* Page Number Buttons */}
        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <Box px={2} component="span">
                ...
              </Box>
            ) : (
              <Button
                variant={currentPage === number ? "contained" : "outlined"}
                onClick={() => onPageChange(number)}
                aria-current={currentPage === number ? "page" : undefined}
                color={currentPage === number ? "primary" : "inherit"}
              >
                {number}
              </Button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <Button
            variant="outlined"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &raquo;
          </Button>
        </li>
      </Box>
    </Box>
  );
};

export default Pagination;
