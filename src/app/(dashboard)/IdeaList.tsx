"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea } from "../../utils/types";
import { fetchIdeas, deleteIdea } from "../../actions/ideas";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import IdeaItem from "./IdeaItem";

export default function IdeaList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

  const { data: ideas = [], isPending } = useQuery({
    queryKey: ["ideas", currentPage, searchQuery],
    queryFn: () => fetchIdeas(currentPage, ITEMS_PER_PAGE, searchQuery),
    placeholderData: (previousData) => previousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIdea,
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
        (oldIdeas: Idea[]) => oldIdeas.filter((idea) => idea.id !== id)
      );
      return { previousIdeas };
    },
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

  return (
    <main className="p-6 max-w-4xl mx-auto flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold text-center">Feature Ideas</h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/create-idea"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        >
          ➕ Create Idea
        </Link>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search ideas..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isPending ? (
        <p className="text-center">Loading...</p>
      ) : ideas.length > 0 ? (
        <ul className="space-y-4 flex-grow">
          {ideas.map((idea) => (
            <IdeaItem
              key={idea.id}
              idea={idea}
              setSelectedIdeaId={setSelectedIdeaId}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg">No ideas found</p>
      )}

      {ideas.length > 0 && (
        <div className="mt-auto pt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalIdeas={ideas.length}
          />
        </div>
      )}

      <ConfirmDialog
        isOpen={!!selectedIdeaId}
        onConfirm={() => {
          if (selectedIdeaId) {
            deleteMutation.mutate(selectedIdeaId);
            setSelectedIdeaId(null);
          }
        }}
        onCancel={() => setSelectedIdeaId(null)}
      />
    </main>
  );
}
