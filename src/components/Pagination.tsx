import React from "react";
import { PaginationProps } from "../utils/types";

const Pagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        Previous
      </button>
      <span className="px-4 py-2 border rounded">Page {currentPage}</span>
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-4 py-2 border rounded bg-blue-500 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
