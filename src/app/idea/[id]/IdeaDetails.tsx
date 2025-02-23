"use client";
import { fetchIdeaById } from "@/actions/ideas";
import { useIdeaMutations } from "@/hooks/useIdeaMutations";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function IdeaDetails() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: idea, isPending } = useQuery({
    queryKey: ["ideaById", id],
    queryFn: () => (id ? fetchIdeaById(id) : Promise.resolve(undefined)),
    enabled: !!id,
    placeholderData: (previousData) => previousData,
  });
  const { upvoteMutation, downvoteMutation } = useIdeaMutations(id!);

  if (isPending)
    return (
      <h1 className="text-2xl text-center mt-10 text-gray-600 ">Loading...</h1>
    );

  return (
    <main className="p-6 min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border border-gray-300 relative">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          ← Back
        </button>

        <div className="mt-4 text-center">
          <h1 className="text-3xl font-bold mb-4">{idea?.summary}</h1>
          {idea?.employeeName && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-600">Added by:</h2>
              <p className="text-lg text-gray-700">{idea?.employeeName}</p>
            </div>
          )}

          {idea?.description && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-600">
                Description:
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
                {idea?.description}
              </p>
            </div>
          )}

          <div className="flex justify-center gap-6 mt-4">
            <div
              onClick={() => upvoteMutation.mutate()}
              className="flex items-center cursor-pointer gap-3 px-6 py-3 rounded-lg shadow-md border border-green-500 bg-green-100 text-green-700 text-lg font-semibold"
            >
              👍 {idea?.upVotes}
            </div>

            <div
              onClick={() => downvoteMutation.mutate()}
              className="flex items-center cursor-pointer gap-3 px-6 py-3 rounded-lg shadow-md border border-red-500 bg-red-100 text-red-700 text-lg font-semibold"
            >
              👎 {idea?.downVotes}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
