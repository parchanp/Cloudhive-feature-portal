import Link from "next/link";
import { IdeaItemProps } from "../../utils/types";
import VoteButtons from "./VoteButtons";

export default function IdeaItem({ idea, setSelectedIdeaId }: IdeaItemProps) {
  return (
    <li className="p-5 rounded-xl shadow-lg bg-gray-50 transition hover:scale-[1.02]">
      <Link href={`/idea/${idea.id}`} className="block">
        <h2 className="text-xl font-semibold">{idea.summary}</h2>
        <h3 className="text-sm text-gray-500">
          Added By - {idea.employeeName}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <VoteButtons idea={idea} />
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedIdeaId(idea.id);
            }}
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete Idea
          </button>
        </div>
      </Link>
    </li>
  );
}
