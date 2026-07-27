import api from "./axios";

export interface Post {
    id: number;
    instagram_id: string;
    image: string;
    caption: string;
    likes: number;
    comments_count: number;
    created_at: string;
}

export async function getPosts(): Promise<Post[]> {
    const response = await api.get("/posts/");
    return response.data.results ?? response.data;
}