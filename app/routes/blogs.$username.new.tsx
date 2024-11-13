import { useState } from "react";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { appendMarkdownFile, readMarkdownFile } from "~/lib/s3.blogs.server";
import { sessionStorage } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const filename = url.searchParams.get("file") || "";
  const fileTitle = filename.split(".").pop();

  const preContent = await readMarkdownFile(filename);

  return json({ preContent, fileTitle });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");
  const formData = await request.formData();
  const filename = formData.get("title") as string;
  const newContent = formData.get("content") as string;
  const description = formData.get("description") as string;
  const action = formData.get("action") as string;

  if (!filename || !newContent) {
    return json(
      { error: "Filename and content are required." },
      { status: 400 }
    );
  }
  if (action === "save") {
    await appendMarkdownFile(
      filename,
      newContent,
      "",
      user.id,
      user.username,
      "draft"
    );
  }
  if (action === "publish") {
    await appendMarkdownFile(
      filename,
      newContent,
      description,
      user.id,
      user.username,
      "public"
    );
  }

  return json({ success: true });
};

export default function NewBlog() {
  const { preContent, fileTitle } = useLoaderData<typeof loader>();
  const [content, setContent] = useState(preContent);
  const [title, setTitle] = useState(fileTitle);
  const [description, setDescription] = useState("");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Write a New Blog Post</h1>
      <Form method="post" encType="multipart/form-data">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your blog post title"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              required
            />
          </div>
          <Tabs defaultValue="write" className="w-full">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog post here... (Markdown supported)"
                rows={30}
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
                required
              />
            </TabsContent>
            <TabsContent value="preview" className="space-y-2">
              <Label>Preview</Label>
              <div className="prose max-w-none p-4 bg-white rounded-md border">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end space-x-2">
            <Button type="submit" name="action" value="save" variant="outline">
              Save Draft
            </Button>
            <Dialog
              open={isPublishModalOpen}
              onOpenChange={setIsPublishModalOpen}
            >
              <DialogTrigger asChild>
                <Button>Publish</Button>
              </DialogTrigger>
              <DialogContent>
                <Form method="post" encType="multipart/form-data">
                  <DialogHeader>
                    <DialogTitle>Publish Your Blog Post</DialogTitle>
                    <DialogDescription>
                      Please provide additional details before publishing your
                      blog post.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="publish-title">Title</Label>
                      <Input
                        id="publish-title"
                        name="publish-title"
                        value={title}
                        onChange={(e: any) => setTitle(e.target.value)}
                        placeholder="Enter your blog post title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Write a brief description of your blog post"
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
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
                      onClick={() => setIsPublishModalOpen(false)}
                    >
                      Publish
                    </Button>
                  </DialogFooter>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Form>
    </>
  );
}
