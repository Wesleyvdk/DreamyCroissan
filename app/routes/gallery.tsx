import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import Masonry from "react-masonry-css";
import { Art, Metadata } from "~/lib/types";

import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const getFileMetadata = async (key: any) => {
  const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3!,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });

  const command = new HeadObjectCommand({
    Bucket: "dreamy-croissant",
    Key: key,
  });

  try {
    const response = await S3.send(command);
    return response.Metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
};

export const loader: LoaderFunction = async () => {
  const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3!,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });
  const images = new ListObjectsV2Command({
    Bucket: "dreamy-croissant",
    Prefix: "images/",
  });
  const { Contents } = await S3.send(images);
  const files = await Promise.all(
    Contents!.map(async (item: any) => {
      const metadata = await getFileMetadata(item.Key);
      const user = await fetch(
        `https://discord.com/api/v10/users/${metadata!.uploader_id}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      ).then(async (response) => await response.json());
      return {
        key: item.Key,
        url: "https://r2.aylanibot.app/" + item.Key,
        title: metadata!.title,
        description: metadata!.description,
        artist_id: metadata!.uploader_id,
        artist: user.username,
        avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
      };
    })
  );
  return files;
};

export default function GalleryPage() {
  const images = useLoaderData<typeof loader>();
  const [artwork, setArtwork] = useState(images);
  const [selectedArtwork, setSelectedArtwork] = useState<Art>();
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      // Load more artwork when the user scrolls to the bottom
      setArtwork((prevArtwork: any) => [
        ...prevArtwork,
        ...images.slice(page * 10, page * 10 + 10),
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Art Gallery</h1>
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search artwork..."
            className="max-w-md"
          />
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {artwork.map((item: any) => (
            <div key={item.key} className="mb-4">
              <div
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => setSelectedArtwork(item)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end justify-start p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm">by {item.artist}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
        <div ref={ref} className="h-10" /> {/* Intersection observer target */}
      </div>

      <Dialog
        open={!!selectedArtwork}
        onOpenChange={() => setSelectedArtwork(undefined)}
      >
        <DialogContent className="max-w-3xl">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArtwork.title}</DialogTitle>
                <DialogDescription>
                  by {selectedArtwork.artist}
                </DialogDescription>
              </DialogHeader>
              <img
                src={selectedArtwork.url}
                alt={selectedArtwork.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {selectedArtwork.likes}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {selectedArtwork.comments}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <div className="flex items-center">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src={`${selectedArtwork.avatar}`} />
                    <AvatarFallback>{selectedArtwork.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {selectedArtwork.artist}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
