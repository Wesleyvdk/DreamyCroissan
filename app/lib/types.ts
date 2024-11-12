export interface Illustrations {
  id: string;
  url: string;
  artist: string;
  title: string;
  likes: number;
}

export interface Story {
  id: string;
  title: string;
  content: string;
}

export interface Art {
  key: string;
  url: string;
  title: string;
  description: string;
  artist_id: string;
  artist: string;
  avatar: string;
  likes: string;
  comments: string;
}

export interface Metadata {
  description: string;
  title: string;
  uploader_id: string;
}
