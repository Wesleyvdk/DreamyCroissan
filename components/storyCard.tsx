import { Generated } from "kysely";

interface Author {
  id: string;
  author: string;
  age: number;
  about: string;
}

interface Stories {
  id: Generated<number>;
  name: string;
  author: string;
  author_id: string;
  story: string;
  date_created: string;
  description: string;
}

export function storyCard({ stories }: { stories: Stories[] }) {}
