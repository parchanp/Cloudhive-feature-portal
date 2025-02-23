import React from "react";
import { PaginationProps } from "../utils/types";
import { ITEMS_PER_PAGE } from "@/utils/constants";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalIdeas,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalIdeas / ITEMS_PER_PAGE);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      <span className="px-4 py-2 border rounded bg-gray-100">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 border rounded transition ${
          currentPage >= totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
