import { Dispatch, SetStateAction } from "react";

export type Idea = {
    id: number;
    summary: string;
    description: string;
    employeeId: number;
    employeeName?: string;
    upVotes: number;
    downVotes: number;
    priority: string;
  };
  
  export type IdeaListProps = {
    ideas: Idea[];
  };
  
  export type PaginationProps = {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
  }