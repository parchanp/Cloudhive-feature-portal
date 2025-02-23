import { Dispatch, SetStateAction } from "react";

export type Idea = {
    id: string;
    summary: string;
    description: string;
    employeeName: string;
    upVotes: number;
    downVotes: number;
    priority: string;
  };

  export type Employee ={
    id: string;
    name: string;
    profileImage: string;
  }
  
  export type IdeaListProps = {
    ideas: Idea[];
  };
  
  export type PaginationProps = {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalIdeas: number;
  }

  export type IdeaFormValues = {
    summary: string;
    description: string;
    employee: string;
    priority: string;
  };
  export type ConfirmDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  };

  export type IdeaItemProps = {
    idea: Idea;
    setSelectedIdeaId: (id: string | null) => void;
  }
  export type VoteButtonsProps = {
    idea: Idea
  }
  