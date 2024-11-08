import { Input } from "~/components/ui/input";

export default function Stories() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="mb-6">
        <Input type="text" placeholder="Search stories..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add StoryCard components here */}
      </div>
    </div>
  );
}
