import {
    Badge,
    Paper,
    Stack,
    Title,
} from "@mantine/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
    useDroppable,
} from "@dnd-kit/core";

import LeadCard from "./LeadCard";

import type { Lead } from "../../api/leads";

interface Props {
    statusId: number;
    title: string;
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
}

export default function KanbanColumn({
    statusId,
    title,
    leads,
    onLeadClick,
}: Props) {

    const {
        setNodeRef,
        isOver,
    } = useDroppable({

        id: `status-${statusId}`,

    });

    return (

        <Paper

            ref={setNodeRef}

            w={340}

            miw={340}

            p="md"

            radius="lg"

            withBorder

            bg={isOver ? "#edf7ff" : "#f8f9fa"}

            style={{

                minHeight: "80vh",

                transition: "0.2s",

                border: isOver
                    ? "2px solid #228be6"
                    : undefined,

            }}

        >

            <Title
                order={4}
                mb="xs"
            >
                {title}
            </Title>

            <Badge
                mb="lg"
                size="lg"
            >
                {leads.length}
            </Badge>

            <SortableContext

                items={leads.map(
                    (lead) => `lead-${lead.id}`,
                )}

                strategy={
                    verticalListSortingStrategy
                }

            >

                <Stack gap="sm">

                    {leads.map((lead) => (

                        <LeadCard

                            key={lead.id}

                            lead={lead}

                            onClick={onLeadClick}

                        />

                    ))}

                </Stack>

            </SortableContext>

        </Paper>

    );

}