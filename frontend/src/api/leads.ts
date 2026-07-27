import api from "./axios";

export interface Lead {

    id: number;

    manager: number;

    status: number;

    comment: number;

}

export async function getLeads() {

    const response = await api.get("/leads/");

    return response.data.results ?? response.data;

}

export async function updateLeadStatus(

    id: number,

    status: number,

) {

    await api.patch(`/leads/${id}/`, {

        status,

    });

}