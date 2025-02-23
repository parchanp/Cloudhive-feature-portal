import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upvoteIdea, downvoteIdea } from "@/actions/ideas";

export function useIdeaMutations(id: string) {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: () => upvoteIdea(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["ideaById", id] });

      const previousIdea = queryClient.getQueryData(["ideaById", id]);

      queryClient.setQueryData(["ideaById", id], (oldIdea: any) => ({
        ...oldIdea,
        upVotes: (oldIdea?.upVotes || 0) + 1,
      }));

      return { previousIdea };
    },
    onError: (_error, _id, context) => {
      if (context?.previousIdea) {
        queryClient.setQueryData(["ideaById", id], context.previousIdea);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ideaById", id] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] }); // Update IdeaList too
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: () => downvoteIdea(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["ideaById", id] });

      const previousIdea = queryClient.getQueryData(["ideaById", id]);

      queryClient.setQueryData(["ideaById", id], (oldIdea: any) => ({
        ...oldIdea,
        downVotes: (oldIdea?.downVotes || 0) + 1,
      }));

      return { previousIdea };
    },
    onError: (_error, _id, context) => {
      if (context?.previousIdea) {
        queryClient.setQueryData(["ideaById", id], context.previousIdea);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ideaById", id] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] }); // Update IdeaList too
    },
  });

  return { upvoteMutation, downvoteMutation };
}
