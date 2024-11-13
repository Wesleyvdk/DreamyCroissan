import { useState } from "react";
import { Link, Outlet, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { MoreVertical, Edit, Trash, Send } from "lucide-react";

// Mock data for user's stories
const mockStories = [
  {
    id: "1",
    title: "The Enchanted Forest",
    status: "published",
    createdAt: "2023-05-15",
    updatedAt: "2023-05-20",
  },
  {
    id: "2",
    title: "Starship Odyssey",
    status: "draft",
    createdAt: "2023-06-01",
    updatedAt: "2023-06-05",
  },
  {
    id: "3",
    title: "The Forgotten Relic",
    status: "draft",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-10",
  },
  {
    id: "4",
    title: "Whispers in the Wind",
    status: "published",
    createdAt: "2023-04-20",
    updatedAt: "2023-04-25",
  },
];

export default function MyStoriesPage() {
  const [stories, setStories] = useState(mockStories);
  const [deleteStoryId, setDeleteStoryId] = useState("");
  const navigate = useNavigate();

  const handleEditStory = (storyId: string) => {
    navigate(`/stories/${storyId}/edit`);
  };

  const handlePublishStory = (storyId: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, status: "published" } : story
      )
    );
  };

  const handleDeleteStory = (storyId: string) => {
    setStories(stories.filter((story) => story.id !== storyId));
    setDeleteStoryId("");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Stories</h1>
          <Button asChild>
            <Link to="/stories/new">New Story</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription>
                  Created on {new Date(story.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={
                    story.status === "published" ? "default" : "secondary"
                  }
                >
                  {story.status === "published" ? "Published" : "Draft"}
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleEditStory(story.id)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {story.status === "draft" && (
                      <DropdownMenuItem
                        onClick={() => handlePublishStory(story.id)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Publish
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => setDeleteStoryId(story.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!deleteStoryId} onOpenChange={() => setDeleteStoryId("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Story</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this story? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteStoryId("")}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteStory(deleteStoryId)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Outlet />
    </>
  );
}
