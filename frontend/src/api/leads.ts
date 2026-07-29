import api from "./axios";

export interface Manager {

    id: number;

    username: string;

    email: string;

}

export interface Status {

    id: number;

    name: string;

    order: number;

}

export interface Comment {

    id: number;

    username: string;

    text: string;

    created_at: string;

    is_replied: boolean;

}

export interface Lead {

    id: number;

    manager: Manager | null;

    status: Status;

    comment: Comment;

    created_at: string;

    updated_at: string;

}

export async function getLeads(): Promise<Lead[]> {

    const response = await api.get("/leads/");

    return response.data.results ?? response.data;

}

export async function updateLeadStatus(
    id: number,
    statusId: number,
) {

    return api.patch(`/leads/${id}/`, {

        status_id: statusId,

    });

}