import { DialogContent, Dialog } from "@radix-ui/react-dialog";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { sessionStorage } from "~/session.server";
import { auth } from "~/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
    );
    const user = session.get("user");

    const S3 = new S3Client({
      region: "auto",
      endpoint: process.env.CLOUDFLARE_S3!,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });
    const formData = await request.formData();
    const title = formData.get("artwork-title") as string;
    const description = formData.get("artwork-description") as string;
    const file = formData.get("artwork-file") as File;

    const validExtensions = ["png", "jpg", "jpeg", "webp"];
    const extension = file.name.split(".").pop();
    if (!title || !description || !file) {
      return json({ error: "All fields are required" }, { status: 400 });
    }
    if (!validExtensions.includes(extension!)) {
      return json({ error: "Invalid file type" }, { status: 400 });
    }

    let randInt = randomIntFromInterval(1, 999999999999999999);

    console.log("filetype:", typeof file);
    const buffer = await file.arrayBuffer();

    const upload = new Upload({
      client: S3,
      params: {
        Bucket: "dreamy-croissant",
        Key: `images/${randInt}-${user.id}-${file.name}`,
        Body: Buffer.from(buffer),
        Metadata: {
          uploader_id: user.id,
          uploader: user.displayName,
          title: title,
          description: description,
        },
        ContentType: file.type,
      },
    });
    try {
      const result = await upload.done();
      // console.log("Upload result:", result);

      return redirect("/gallery");
    } catch (err) {
      console.error("Error uploading:", err);
      throw err;
    }
  } catch (err) {
    console.error("Error in action handler:", err);
    throw err;
  }
}

export let loader: LoaderFunction = async ({ request }) => {
  const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3!,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });

  const authenticated = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return authenticated;
  // const image = new ListObjectsV2Command({
  //   Bucket: "dreamy-croissant",
  //   Prefix: `images/${authenticated.id}`,
  // });
};

export default function NewArt() {
  const { authenticated } = useLoaderData<typeof loader>();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Submit Your Artwork</h1>
      <p>
        Share your illustration inspired by this story. Please ensure you have
        the rights to the artwork you're submitting.
      </p>
      <Form method="post" encType="multipart/form-data">
        <div>
          <Label htmlFor="artwork-title">Artwork Title</Label>
          <Input
            name="artwork-title"
            id="artwork-title"
            placeholder="Enter a title for your artwork"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="artwork-description">Description</Label>
          <Textarea
            name="artwork-description"
            id="artwork-description"
            placeholder="Describe your artwork or the scene it represents"
            rows={10}
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="artwork-file">Upload Artwork</Label>
          <Input
            id="artwork-file"
            name="artwork-file"
            type="file"
            value={image}
            onChange={(e: any) => setImage(e.target.value)}
            required
          />
        </div>
        <Button variant="outline">Submit Artwork</Button>
      </Form>
    </>
  );
}
// onClick={handleSubmitArtwork}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
