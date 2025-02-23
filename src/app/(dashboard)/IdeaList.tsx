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

  const { data, isPending } = useQuery({
    queryKey: ["ideas", currentPage, searchQuery],
    queryFn: () => fetchIdeas(currentPage, ITEMS_PER_PAGE, searchQuery),
    placeholderData: (previousData) => previousData,
  });
  const ideas = data?.paginatedIdeas || [];
  const totalItems = data?.totalItems || 0;

  const deleteMutation = useMutation({
    mutationFn: deleteIdea,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["ideas"] });

      const previousIdeas = queryClient.getQueryData<Idea[]>(["ideas"]);

      queryClient.setQueryData(["ideas"], (oldIdeas: Idea[] | undefined) =>
        oldIdeas ? oldIdeas.filter((idea) => idea.id !== id) : []
      );

      return { previousIdeas };
    },
    onError: (_error, _id, context) => {
      if (context?.previousIdeas) {
        queryClient.setQueryData(["ideas"], context.previousIdeas);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="p-6 min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 border border-gray-300 flex flex-col min-h-[500px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          List Of Feature Ideas
        </h1>

        {/* Create Idea Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/create-idea"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            ➕ Create Idea
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 pl-10 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ideas List */}
        <div className="flex-grow">
          {isPending ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : ideas.length > 0 ? (
            <ul className="space-y-4">
              {ideas.map((idea) => (
                <IdeaItem
                  key={idea.id}
                  idea={idea}
                  setSelectedIdeaId={setSelectedIdeaId}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg text-gray-500">No ideas found</p>
          )}
        </div>

        {/* Pagination - Always at the Bottom */}
        {ideas.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalIdeas={totalItems}
            />
          </div>
        )}

        {/* Delete Confirmation Dialog */}
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
      </div>
    </main>
  );
}
