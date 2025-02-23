"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea } from "../../utils/types";
import { downvoteIdea, fetchIdeas, upvoteIdea } from "../../actions/ideas";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import Link from "next/link";

export default function IdeaList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: ideas = [], isPending } = useQuery({
    queryKey: ["ideas", currentPage, searchQuery],
    queryFn: () => fetchIdeas(currentPage, ITEMS_PER_PAGE, searchQuery),
    placeholderData: (previousData) => previousData,
  });

  const upvoteMutation = useMutation({
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["ideas", currentPage, searchQuery],
      });
      const previousIdeas = queryClient.getQueryData([
        "ideas",
        currentPage,
        searchQuery,
      ]);
      queryClient.setQueryData(
        ["ideas", currentPage, searchQuery],
        (old: Idea[] | undefined) =>
          old?.map((idea) =>
            idea.id === id ? { ...idea, upVotes: idea.upVotes + 1 } : idea
          )
      );
      return { previousIdeas };
    },
    mutationFn: (id: string) => upvoteIdea(id),

    onError: (_error, _id, context) => {
      if (context?.previousIdeas) {
        queryClient.setQueryData(
          ["ideas", currentPage, searchQuery],
          context.previousIdeas
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["ideas", currentPage, searchQuery],
      });
    },
  });

  const downvoteMutation = useMutation({
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["ideas", currentPage, searchQuery],
      });
      const previousIdeas = queryClient.getQueryData([
        "ideas",
        currentPage,
        searchQuery,
      ]);
      queryClient.setQueryData(
        ["ideas", currentPage, searchQuery],
        (old: Idea[] | undefined) =>
          old?.map((idea) =>
            idea.id === id ? { ...idea, downVotes: idea.downVotes + 1 } : idea
          )
      );
      return { previousIdeas };
    },
    mutationFn: (id: string) => downvoteIdea(id),

    onError: (_error, _id, context) => {
      if (context?.previousIdeas) {
        queryClient.setQueryData(
          ["ideas", currentPage, searchQuery],
          context.previousIdeas
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["ideas", currentPage, searchQuery],
      });
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleUpvote = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    upvoteMutation.mutate(id);
  };

  const handleDownvote = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    downvoteMutation.mutate(id);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto relative flex flex-col min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Feature Ideas
      </h1>

      {/* Create Idea Button */}
      <div className="flex justify-end mb-4">
        <Link
          href="/create-idea"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          ➕ Create Idea
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search ideas..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l6-6m0 0l-6-6m6 6H3"
          />
        </svg>
      </div>

      {/* Ideas List */}
      {isPending ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      ) : (
        <ul className="space-y-4 flex-grow">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transform transition hover:scale-[1.02]"
            >
              <Link href={`/idea/${idea.id}`} className="block">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {idea.summary}
                  </h2>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400">
                    Added By - {idea.employeeName}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {idea.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                      <span>👍 {idea.upVotes}</span>
                      <span>👎 {idea.downVotes}</span>
                    </div>

                    <button
                      onClick={(event) => handleUpvote(event, idea.id)}
                      className="px-5 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                      disabled={
                        upvoteMutation.isPending &&
                        upvoteMutation.variables === idea.id
                      }
                    >
                      Upvote 🚀
                    </button>
                    <button
                      onClick={(event) => handleDownvote(event, idea.id)}
                      className="px-5 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                      disabled={
                        downvoteMutation.isPending &&
                        downvoteMutation.variables === idea.id
                      }
                    >
                      Downvote 🚀
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalIdeas={ideas.length}
        />
      </div>
    </main>
  );
}
