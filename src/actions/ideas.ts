"use server";
import { promises as fs } from "fs";
import path from "path";
import { Idea } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

const FILE_PATH = path.join(process.cwd(), "data", "ideas.json");

export async function fetchIdeas(page: number = 1, limit: number = 20, searchQuery: string = '') {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  let ideas: Idea[] = JSON.parse(data);
  if (searchQuery) {
    ideas = ideas.filter((idea) =>
      idea.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const totalItems = ideas.length
  const paginatedIdeas = ideas.sort((a, b) => b.upVotes - a.upVotes).slice((page - 1) * limit, page * limit);

  return {paginatedIdeas, totalItems};
}

export async function fetchIdeaById(id: string) {
  const data = await fetchIdeas(1, Number.MAX_SAFE_INTEGER, "");
  const ideas = data?.paginatedIdeas 
  const idea = ideas.find((idea) => idea.id === id);
  return idea
}

export async function createIdea(formData: FormData) {
  try {
    const summary = formData.get("summary") as string;
    const description = formData.get("description") as string;
    const employee = formData.get("employee") as string;
    const priority = formData.get("priority") as string;

    if (!summary || !description || !employee) {
      throw new Error("Missing required fields");
    }

    let ideas = [];
    try {
      const fileData = await fs.readFile(FILE_PATH, "utf-8");
      ideas = JSON.parse(fileData);
    } catch (error) {
      console.warn("No existing data, creating a new file.");
    }

    const newIdea = { id:uuidv4() , summary, description, employeeName: employee , priority , upVotes : 0 , downVotes: 0 };

    ideas.push(newIdea);
    await fs.writeFile(FILE_PATH, JSON.stringify(ideas, null, 2));

    return { success: true, message: "Idea created successfully", idea: newIdea };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function upvoteIdea(id: string) {
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

export async function downvoteIdea(id: string) {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    let ideas: Idea[] = JSON.parse(data);

    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
    if (ideaIndex === -1) {
      throw new Error("Idea not found");
    }

    ideas[ideaIndex].downVotes += 1;

    await fs.writeFile(FILE_PATH, JSON.stringify(ideas, null, 2), "utf-8");

    return ideas[ideaIndex];
  } catch (error) {
    console.error("Error upvoting idea:", error);
    throw new Error("Failed to upvote idea");
  }
}

export async function deleteIdea(id : string){
  try{
    const data = await fs.readFile(FILE_PATH , 'utf-8')
    let ideas = JSON.parse(data)
    const updatedIdeas = ideas.filter((idea: Idea) => idea.id !== id)
    await fs.writeFile(FILE_PATH , JSON.stringify(updatedIdeas, null , 2) , 'utf-8')
    return { success: true, message: "Idea deleted successfully" };
  }catch(error){
    console.error("error in deleting the idea", error)
    throw new Error('Failed to delete the idea')
  }
}


