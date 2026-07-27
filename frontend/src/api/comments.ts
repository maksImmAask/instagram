import api from "./axios";

export interface Comment {

    id: number;

    username: string;

    text: string;

    is_replied: boolean;

    created_at: string;

    post: number;

}

export async function getComments(): Promise<Comment[]> {

    const response = await api.get("/comments/");

    return response.data.results ?? response.data;

}