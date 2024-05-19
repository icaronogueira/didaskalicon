export interface Comment {
    id?: string;
    author: string;
    text: string;
    date_posted?: Date;
    post_id: string;
}