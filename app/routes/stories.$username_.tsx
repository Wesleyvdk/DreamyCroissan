import { useState } from "react";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
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
  DialogTrigger,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { MoreVertical, Edit, Trash, Send } from "lucide-react";
import {
  appendMarkdownFile,
  deleteStory,
  readAllStories,
} from "~/lib/s3.stories.server";

import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { sessionStorage } from "~/session.server";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";

export const loader: LoaderFunction = async ({ request }) => {
  const storiesLoaded = await readAllStories();
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");
  return { storiesLoaded, user };
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");

  if (!user) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const action = formData.get("action") as string;
  const filename = formData.get("title") as string;
  const description = formData.get("description") as string;
  const genre = formData.get("genre") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;
  if (action === "edit") {
    return redirect(`/stories/${user.username}/new`);
  }
  if (action === "delete") {
    await deleteStory(filename);
    return;
  }
  if (action === "publish") {
    await appendMarkdownFile(
      filename,
      "",
      user.id,
      user.username,
      genre,
      description,
      "published"
    );
    return;
  }
}

export default function MyStoriesPage() {
  const { storiesLoaded, user } = useLoaderData<typeof loader>();
  const [stories, setStories] = useState(storiesLoaded);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Stories</h1>
          <Button asChild>
            <Link to={`/stories/${user.username}/new`}>New Story</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story: any) => (
            <Card key={story.title}>
              <CardHeader>
                <Button variant={"ghost"} asChild>
                  {story.status === "published" ? (
                    <Link to={`/stories/${user.username}/${story.title}`}>
                      <CardTitle>{story.title}</CardTitle>
                    </Link>
                  ) : (
                    <CardTitle>{story.title}</CardTitle>
                  )}
                </Button>
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
                <div className="flex justify-end space-x-4">
                  <Form method="post" encType="multipart/form-data">
                    <Button
                      type="submit"
                      name="action"
                      value="edit"
                      variant="outline"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Form>
                  <Dialog
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <Form method="post" encType="multipart/form-data">
                        <DialogHeader>
                          <DialogTitle>Delete Story</DialogTitle>
                          <Input
                            hidden={true}
                            id="title"
                            name="title"
                            value={story.title}
                          />
                          <DialogDescription>
                            Are you sure you want to delete this story? This
                            action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                          >
                            Cancel
                          </Button>

                          <Button
                            variant="destructive"
                            type="submit"
                            name="action"
                            value="delete"
                            onClick={() => window.location.reload()}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  {story.status === "draft" && (
                    <Dialog
                      open={isPublishModalOpen}
                      onOpenChange={setIsPublishModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Send />
                          Publish
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <Form method="post" encType="multipart/form-data">
                          <DialogHeader>
                            <DialogTitle>Publish Your Story Post</DialogTitle>
                            <DialogDescription>
                              Please provide additional details before
                              publishing your Story post.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                name="title"
                                value={story.title}
                                onChange={(e: any) => setTitle(e.target.value)}
                                placeholder="Enter your story post title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="genre">Genre</Label>
                              <Select
                                name="genre"
                                value={genre}
                                onValueChange={setGenre}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a genre" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fantasy">
                                    Fantasy
                                  </SelectItem>
                                  <SelectItem value="scifi">
                                    Science Fiction
                                  </SelectItem>
                                  <SelectItem value="romance">
                                    Romance
                                  </SelectItem>
                                  <SelectItem value="mystery">
                                    Mystery
                                  </SelectItem>
                                  <SelectItem value="horror">Horror</SelectItem>
                                  <SelectItem value="thriller">
                                    Thriller
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">
                                Short Description
                              </Label>
                              <Textarea
                                id="description"
                                name="description"
                                placeholder="Write a brief description of your story post"
                                value={description}
                                onChange={(e: any) =>
                                  setDescription(e.target.value)
                                }
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsPublishModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              name="action"
                              value="publish"
                              onClick={() => window.location.reload()}
                            >
                              Publish
                            </Button>
                          </DialogFooter>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
