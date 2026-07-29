import {
    Avatar,
    Badge,
    Button,
    Divider,
    Drawer,
    Group,
    Stack,
    Text,
} from "@mantine/core";

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

                <Button fullWidth>

                    Send Instagram Message

                </Button>

            </Stack>

        </Drawer>

    );

}