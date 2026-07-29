import api from "./axios";

export interface LeadStatus {
    id: number;
    name: string;
    order: number;
}

export async function getStatuses(): Promise<LeadStatus[]> {
    const response = await api.get("/statuses/");
    return response.data.results ?? response.data;
}