"use client";
import { fetchIdeaById } from "@/actions/ideas";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function IdeaDetails() {
  const params = useParams();
  const { data: idea, isPending } = useQuery({
    queryKey: ["ideaById", params.id],
    queryFn: () => fetchIdeaById(Number(params.id)),
    placeholderData: (previousData) => previousData,
  });

  if (isPending) return <h1>Loading .....</h1>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {idea?.summary}
      </h1>
      <p className="text-gray-500 dark:text-gray-300">
        Added by Employee ID: {idea?.employeeId}
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-200 mt-4">
        {idea?.description}
      </p>
      <div className="mt-6 flex gap-4">
        <span className="text-green-500 font-semibold">👍 {idea?.upVotes}</span>
        <span className="text-red-500 font-semibold">👎 {idea?.downVotes}</span>
      </div>
    </main>
  );
}
