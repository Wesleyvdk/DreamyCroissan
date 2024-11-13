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
  deleteBlog,
  readAllBlogs,
} from "~/lib/s3.blogs.server";

import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { sessionStorage } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const blogsLoaded = await readAllBlogs();
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");
  return { blogsLoaded, user };
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
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;
  if (action === "edit") {
    return redirect(`/blogs/${user.username}/new`);
  }
  if (action === "delete") {
    await deleteBlog(filename);
    return redirect(`/blogs/${user.username}`);
  }
  if (action === "publish") {
    await appendMarkdownFile(
      filename,
      "",
      description,
      user.id,
      user.username,
      "published"
    );
    return redirect(`/blogs/${user.username}`);
  }
}

export default function MyStoriesPage() {
  const { blogsLoaded, user } = useLoaderData<typeof loader>();
  const [blogs, setBlogs] = useState(blogsLoaded);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <Button asChild>
            <Link to={`/blogs/${user.username}/new`}>New Blog</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: any) => (
            <Card key={blog.title}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  Created on {new Date(blog.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={
                    blog.status === "published" ? "default" : "secondary"
                  }
                >
                  {blog.status === "published" ? "Published" : "Draft"}
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
                            value={blog.title}
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

                  {blog.status === "draft" && (
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
                            <DialogTitle>Publish Your Blog Post</DialogTitle>
                            <DialogDescription>
                              Please provide additional details before
                              publishing your blog post.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                name="title"
                                value={blog.title}
                                onChange={(e: any) => setTitle(e.target.value)}
                                placeholder="Enter your blog post title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">
                                Short Description
                              </Label>
                              <Textarea
                                id="description"
                                name="description"
                                placeholder="Write a brief description of your blog post"
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
