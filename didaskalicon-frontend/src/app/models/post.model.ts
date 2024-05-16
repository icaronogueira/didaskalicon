import { PostPart } from "./post-part.model";

export interface Post {
    _id: string;
    title: string;
    subtitle: string;
    cover_image_url: string;
    tags: string[];
    date_posted: Date;
    content: PostPart[];
    likes: number;
    dislikes: number;
}
