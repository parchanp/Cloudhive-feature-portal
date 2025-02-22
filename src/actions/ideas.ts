"use server";
import { promises as fs } from "fs";
import path from "path";
import { Idea } from "../utils/types";

const FILE_PATH = path.join(process.cwd(), "data", "ideas.json");

export async function fetchIdeas(page: number = 1, limit: number = 20, searchQuery: string = '') {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  let ideas: Idea[] = JSON.parse(data);
  if (searchQuery) {
    ideas = ideas.filter((idea) =>
      idea.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
// todo : return total items 
  const paginatedIdeas = ideas.sort((a, b) => b.upVotes - a.upVotes).slice((page - 1) * limit, page * limit);

  return paginatedIdeas;
}

export async function fetchIdeaById(id: number){
  const ideas: Idea[] = await fetchIdeas();
  const pp = ideas.find((idea) => idea.id === id);
  return pp
}

export async function upvoteIdea(id: number) {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    let ideas: Idea[] = JSON.parse(data);

    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
    if (ideaIndex === -1) {
      throw new Error("Idea not found");
    }

    ideas[ideaIndex].upVotes += 1;

    await fs.writeFile(FILE_PATH, JSON.stringify(ideas, null, 2), "utf-8");

    return ideas[ideaIndex];
  } catch (error) {
    console.error("Error upvoting idea:", error);
    throw new Error("Failed to upvote idea");
  }
}

export async function downvoteIdea(id: number) {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    let ideas: Idea[] = JSON.parse(data);

    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
    if (ideaIndex === -1) {
      throw new Error("Idea not found");
    }

    ideas[ideaIndex].downVotes += 1;

    await fs.writeFile(FILE_PATH, JSON.stringify(ideas, null, 2), "utf-8");

    return ideas[ideaIndex]; // Return the updated idea
  } catch (error) {
    console.error("Error upvoting idea:", error);
    throw new Error("Failed to upvote idea");
  }
}
