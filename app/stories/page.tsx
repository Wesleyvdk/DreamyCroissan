import "../globals.css";
import { StoryCard } from "@/components";
import { Card } from "@tremor/react";
import { queryBuilder } from "../../lib/planetscale";

export default async function Home() {
  const stories = await queryBuilder
    .selectFrom("stories")
    .select([
      "id",
      "name",
      "author",
      "author_id",
      "story",
      "date_created",
      "description",
    ])
    .orderBy("id", "desc")
    .execute();
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6 bg-void">
        <div>
          pressing a story will redirect to about page for now. work in progress
        </div>
        <StoryCard stories={stories} />
      </Card>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            About{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Dreamy Croissant!
          </p>
        </a>

        <a
          href="https://discord.gg/PPCgrHZK5P"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Contact{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Contact Us.</p>
        </a>

        <a
          href="/partners"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Partners{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Our Partners.</p>
        </a>
      </div>
    </main>
  );
}
