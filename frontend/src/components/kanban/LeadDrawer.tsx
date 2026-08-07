import {
    Avatar,
    Badge,
    Button,
    Divider,
    Drawer,
    Group,
    Image,
    Stack,
    Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

import {
    getLeadMessages,
    type Message,
} from "../../api/messages";
import type { Lead } from "../../api/leads";

interface Props {

    opened: boolean;

    onClose: () => void;

    lead: Lead | null;

}

export default function LeadDrawer({

    opened,

    onClose,

    lead,

}: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
        useEffect(() => {

        if (!lead) return;

        getLeadMessages(
            lead.id,
        ).then(setMessages);

    }, [lead]);
    if (!lead) return null;

    return (

        <Drawer

            opened={opened}

            onClose={onClose}

            position="right"

            size={420}

            title={`Lead #${lead.id}`}

        >

            <Stack>
{lead.comment.post?.image && (
    <>
        <Image
            src={lead.comment.post.image}
            radius="md"
            h={220}
            fit="cover"
        />

        <Text
            size="sm"
            c="dimmed"
            lineClamp={2}
        >
            {lead.comment.post.caption}
        </Text>

        <Divider />
    </>
)}
                <Group>

                    <Avatar
                        radius="xl"
                        color="blue"
                    >
                        {lead.comment.username[0].toUpperCase()}
                    </Avatar>

                    <div>

                        <Text fw={700}>

                            @{lead.comment.username}

                        </Text>

                        <Text
                            size="sm"
                            c="dimmed"
                        >

                            {new Date(
                                lead.comment.created_at,
                            ).toLocaleString()}

                        </Text>

                    </div>

                </Group>

                <Badge
                    size="lg"
                    variant="light"
                >

                    {lead.status.name}

                </Badge>

                <Divider />

                <Text fw={700}>
                    Manager
                </Text>

                <Text>
                    {lead.manager?.username ?? "Не назначен"}
                </Text>

                <Divider />

                <Text fw={700}>
                    Instagram Comment
                </Text>

                <Text>
                    {lead.comment.text}
                </Text>

                <Divider />

                <Text fw={700}>
                    Replied
                </Text>

                <Badge
                    color={
                        lead.comment.is_replied
                            ? "green"
                            : "red"
                    }
                >
                    {lead.comment.is_replied
                        ? "Answered"
                        : "Not answered"}
                </Badge>

                <Divider />

<Text fw={700}>
    Chat
</Text>

<Stack
    gap="xs"
    h={250}
    style={{
        overflowY: "auto",
    }}
>

    {messages.length === 0 && (

        <Text
            size="sm"
            c="dimmed"
        >
            No messages
        </Text>

    )}

    {messages.map((message) => (

        <Group
            key={message.id}
            justify={
                message.is_from_instagram
                    ? "flex-start"
                    : "flex-end"
            }
        >

            <Badge
                variant={
                    message.is_from_instagram
                        ? "light"
                        : "filled"
                }
                size="lg"
            >
                {message.text}
            </Badge>

        </Group>

    ))}

</Stack>

<Button
    mt="md"
    fullWidth
>

    Send Instagram Message

</Button>

            </Stack>

        </Drawer>

    );

}