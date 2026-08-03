import api from "./axios";

export interface Message {

    id: number;

    lead: number;

    instagram_message_id: string;

    sender_id: string;

    text: string;

    is_from_instagram: boolean;

    created_at: string;

}

export async function getLeadMessages(
    leadId: number,
): Promise<Message[]> {

    const response = await api.get(
        `/leads/${leadId}/messages/`,
    );

    return response.data;
}