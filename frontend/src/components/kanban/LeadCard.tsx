import {
    Avatar,
    Badge,
    Card,
    Group,
    Image,
    Stack,
    Text,
} from "@mantine/core";

import { IconMessageCircle } from "@tabler/icons-react";

import {
    useSortable,
} from "@dnd-kit/sortable";

import {
    CSS,
} from "@dnd-kit/utilities";

import type { Lead } from "../../api/leads";

interface Props {
    lead: Lead;
    onClick: (lead: Lead) => void;
}

export default function LeadCard({
    lead,
    onClick,
}: Props) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({

        id: `lead-${lead.id}`,

    });

    return (

        <Card

            ref={setNodeRef}

            {...attributes}

            {...listeners}

            onClick={() => onClick(lead)}

            shadow="sm"

            radius="md"

            withBorder

            p="md"

            style={{

                cursor: "grab",

                transform: CSS.Transform.toString(transform),

                transition,

                opacity: isDragging ? 0.4 : 1,

                boxShadow: isDragging
                    ? "0 15px 35px rgba(0,0,0,.2)"
                    : undefined,

            }}

        >
{lead.comment.post?.image && (
    <Image
        src={lead.comment.post.image}
        h={180}
        radius="md"
        mb="md"
        fit="cover"
    />
)}

            <Group justify="space-between">

                <Group>

                    <Avatar
                        color="blue"
                        radius="xl"
                    >
                        {lead.id}
                    </Avatar>

                    <Stack gap={0}>

                        <Text fw={700}>

                            Lead #{lead.id}

                        </Text>

                        <Text
                            size="xs"
                            c="dimmed"
                        >
                            {lead.manager?.username ?? "Не назначен"}
                        </Text>

                    </Stack>

                </Group>

                <Badge variant="light">
    {lead.status.name}
</Badge>

            </Group>

            <Stack gap={2} mt="md">

    <Text fw={600}>
        @{lead.comment.username}
    </Text>

    <Text size="sm">
        {lead.comment.text}
    </Text>
<Text
    size="xs"
    c="dimmed"
    lineClamp={2}
>
    {lead.comment.post.caption}
</Text>
</Stack>

            <Group
                mt="md"
                justify="space-between"
            >

                <Group gap={5}>

                    <IconMessageCircle size={16} />

                    <Text size="xs">

                        Instagram

                    </Text>

                </Group>

                <Text
                    size="xs"
                    c="dimmed"
                >

                    {new Date(
                        lead.created_at,
                    ).toLocaleDateString()}

                </Text>

            </Group>

        </Card>

    );

}