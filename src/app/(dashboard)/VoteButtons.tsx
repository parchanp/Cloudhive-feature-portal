import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea, VoteButtonsProps } from "../../utils/types";
import { useIdeaMutations } from "@/hooks/useIdeaMutations";

export default function VoteButtons({ idea }: VoteButtonsProps) {
  const queryClient = useQueryClient();

  const { upvoteMutation, downvoteMutation } = useIdeaMutations(idea.id);

  return (
    <div className="flex gap-4">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          upvoteMutation.mutate();
        }}
        className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
        disabled={upvoteMutation.isPending}
      >
        👍 {idea.upVotes}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          downvoteMutation.mutate();
        }}
        className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50"
        disabled={downvoteMutation.isPending}
      >
        👎 {idea.downVotes}
      </button>
    </div>
  );
}
