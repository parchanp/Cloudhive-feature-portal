"use client";
import { fetchIdeaById } from "@/actions/ideas";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function IdeaDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: idea, isPending } = useQuery({
    queryKey: ["ideaById", id],
    queryFn: () => (id ? fetchIdeaById(id) : Promise.resolve(undefined)),
    enabled: !!id,

    placeholderData: (previousData) => previousData,
  });

  if (isPending) return <h1>Loading .....</h1>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Idea Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          {idea?.summary}
        </h1>

        {/* Employee Info */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💼 Added by{" "}
          <span className="font-semibold">{idea?.employeeName}</span>
        </p>

        {/* Idea Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          {idea?.description}
        </p>

        {/* Votes Section */}
        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
            <span className="text-green-600 dark:text-green-400 text-lg">
              👍
            </span>
            <span className="font-semibold text-green-700 dark:text-green-300">
              {idea?.upVotes}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900 px-4 py-2 rounded-lg">
            <span className="text-red-600 dark:text-red-400 text-lg">👎</span>
            <span className="font-semibold text-red-700 dark:text-red-300">
              {idea?.downVotes}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
