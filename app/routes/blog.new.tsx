import { useState } from "react";
import { useNavigate } from "@remix-run/react";
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

export default function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving blog post:", { title, content });
    // Simulate successful save
    alert("Blog post saved successfully!");
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
    console.log("Publishing blog post:", { title, content, description });
    setIsPublishModalOpen(false);
    // Simulate successful publish
    alert("Blog post published successfully!");
    navigate("/blogs");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Write a New Blog Post</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
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
          <Button variant="outline" onClick={handleSave}>
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
              <DialogHeader>
                <DialogTitle>Publish Your Blog Post</DialogTitle>
                <DialogDescription>
                  Please provide additional details before publishing your blog
                  post.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="publish-title">Title</Label>
                  <Input
                    id="publish-title"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    placeholder="Enter your blog post title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
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
                <Button onClick={handlePublish}>Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
