import api from "./axios";

export interface DashboardStats {
    leads: number;
    tasks: number;
    posts: number;
    comments: number;
}

export async function getDashboard(): Promise<DashboardStats> {
    const [leads, tasks, posts, comments] = await Promise.all([
        api.get("/leads/"),
        api.get("/tasks/"),
        api.get("/posts/"),
        api.get("/comments/"),
    ]);

    return {
        leads: leads.data.count ?? leads.data.length,
        tasks: tasks.data.count ?? tasks.data.length,
        posts: posts.data.count ?? posts.data.length,
        comments: comments.data.count ?? comments.data.length,
    };
}