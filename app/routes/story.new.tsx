import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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
import Markdown from "react-markdown";

export default function NewStory() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving story:", { title, content });
    // Simulate successful save
    alert("Story saved successfully!");
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
    console.log("Publishing story:", { title, content, genre, description });
    setIsPublishModalOpen(false);
    // Simulate successful publish
    alert("Story published successfully!");
    navigate("/stories");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Create Your Story</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter your story title"
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
              placeholder="Write your story here... (Markdown supported)"
              rows={30}
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
              required
            />
          </TabsContent>
          <TabsContent value="preview" className="space-y-2">
            <Label>Preview</Label>
            <div className="prose max-w-none p-4 bg-white rounded-md border">
              <Markdown>{content}</Markdown>
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
                <DialogTitle>Publish Your Story</DialogTitle>
                <DialogDescription>
                  Please provide additional details before publishing your
                  story.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="publish-title">Title</Label>
                  <Input
                    id="publish-title"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    placeholder="Enter your story title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="scifi">Science Fiction</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a brief description of your story"
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
