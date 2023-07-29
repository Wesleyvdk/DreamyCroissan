import { Generated } from "kysely";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react";
import Link from "next/link";

interface Author {
  id: string;
  author: string;
  age: number;
  about: string;
}

interface Stories {
  id: number;
  name: string;
  author: string;
  author_id: string;
  story: string;
  date_created: string;
  description: string;
}

export default function StoryCard({ stories }: { stories: Stories[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-stark">Title</TableHeaderCell>
          <TableHeaderCell className="text-stark">Author</TableHeaderCell>
          <TableHeaderCell className="text-stark">Date Created</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stories.map((story) => (
          <TableRow key={story.id}>
            <TableCell className="text-stark">
              <Link href="/">{story.name}</Link>
            </TableCell>
            <TableCell>
              <Text className="inline-flex whitespace-pre text-stark">
                {story.author}
              </Text>
            </TableCell>
            <TableCell>
              <Text className="text-stark">{story.date_created}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
