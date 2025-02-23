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

  if (isPending)
    return (
      <h1 className="text-2xl text-center mt-10 text-gray-600 ">Loading...</h1>
    );

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl border border-gray-300 rounded-2xl p-10">
        {/* Idea Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-600">Summary:</h2>
          <h1 className="text-3xl font-bold text-gray-900 leading-snug">
            {idea?.summary}
          </h1>
        </div>

        {/* Employee Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-600">Added by:</h2>
          <p className="text-lg text-gray-700">{idea?.employeeName}</p>
        </div>

        {/* Idea Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-600">Description:</h2>
          <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
            {idea?.description}
          </p>
        </div>

        {/* Votes Section */}
        <div className="flex gap-6">
          <div className="flex items-center gap-3 px-6 py-3 rounded-lg shadow-md border border-green-500 bg-green-100 text-green-700 text-lg font-semibold">
            👍 {idea?.upVotes}
          </div>

          <div className="flex items-center gap-3 px-6 py-3 rounded-lg shadow-md border border-red-500 bg-red-100 text-red-700 text-lg font-semibold">
            👎 {idea?.downVotes}
          </div>
        </div>
      </div>
    </main>
  );
}
