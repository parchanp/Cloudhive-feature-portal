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