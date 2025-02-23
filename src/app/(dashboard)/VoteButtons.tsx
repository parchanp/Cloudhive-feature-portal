import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea, VoteButtonsProps } from "../../utils/types";
import { upvoteIdea, downvoteIdea } from "../../actions/ideas";

export default function VoteButtons({ idea }: VoteButtonsProps) {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: (id: string) => upvoteIdea(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["ideas"] });
      queryClient.setQueryData(["ideas"], (old: Idea[] | undefined) =>
        old?.map((item) =>
          item.id === id ? { ...item, upVotes: item.upVotes + 1 } : item
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["ideas"] }),
  });

  const downvoteMutation = useMutation({
    mutationFn: (id: string) => downvoteIdea(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["ideas"] });
      queryClient.setQueryData(["ideas"], (old: Idea[] | undefined) =>
        old?.map((item) =>
          item.id === id ? { ...item, downVotes: item.downVotes + 1 } : item
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["ideas"] }),
  });

  return (
    <div className="flex gap-4">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          upvoteMutation.mutate(idea.id);
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
          downvoteMutation.mutate(idea.id);
        }}
        className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50"
        disabled={downvoteMutation.isPending}
      >
        👎 {idea.downVotes}
      </button>
    </div>
  );
}
