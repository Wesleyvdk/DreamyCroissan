import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { redirect } from "@remix-run/node";
import { FileMinus } from "lucide-react";
import { Readable } from "stream";

const S3 = new S3Client({
  region: "auto",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.CLOUDFLARE_S3 || undefined, // Optional for Cloudflare R2
});

const BUCKET_NAME = "dreamy-croissant";

// Utility to stream S3 data into a string
const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", (err) => reject(err));
  });

export async function readAllBlogs() {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: "blogs/",
  });
  const response = await S3.send(command);
  const files =
    response.Contents?.map(
      (content) => content.Key!.split("/")[1].split(".")[0]
    ) || [];
  const blogs = await Promise.all(
    files.map(async (file) => {
      const info = await readBlogInfo(file);

      return {
        title: file,
        description: info.Metadata.description,
        status: info.Metadata.status,
      };
    })
  );
  return blogs;
}

export async function readBlogInfo(filename: string): Promise<any> {
  const command = new HeadObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `blogs/${filename}.md`,
  });
  try {
    const response = await S3.send(command);
    return response;
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

export async function readMarkdownFile(filename: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `blogs/${filename}.md`,
    });
    const response = await S3.send(command);
    return await streamToString(response.Body as Readable);
  } catch (error: any) {
    if (error.name === "NoSuchKey") {
      return ""; // Return empty if file doesn't exist
    }
    throw error;
  }
}
export async function deleteBlog(filename: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `blogs/${filename}.md`,
  });

  await S3.send(command);
  return;
}

export async function appendMarkdownFile(
  filename: string,
  content: string,
  description: string,
  uploader_id: string,
  uploader: string,
  status: string
): Promise<void> {
  const existingContent = await readMarkdownFile(filename);
  const updatedContent = existingContent + "\n" + content;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `blogs/${filename}.md`,
    Body: updatedContent,
    Metadata: {
      uploader_id,
      uploader,
      description,
      status,
    },
    ContentType: "text/markdown",
  });

  await S3.send(command);
}
