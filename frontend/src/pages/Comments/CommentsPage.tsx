import { useEffect, useState } from "react";

import {

    Avatar,
    Badge,
    Button,
    Card,
    Group,
    Stack,
    Text,
    Title,

} from "@mantine/core";

import {

    IconBrandInstagram,
    IconUserPlus,

} from "@tabler/icons-react";

import {

    getComments,
    type Comment,

} from "../../api/comments";

export default function CommentsPage() {

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {

        getComments().then(setComments);

    }, []);

    return (

        <>

            <Title mb="xl">

                Instagram Comments

            </Title>

            <Stack>

                {comments.map((comment) => (

                    <Card
                        key={comment.id}
                        shadow="sm"
                        radius="lg"
                        withBorder
                    >

                        <Group justify="space-between">

                            <Group>

                                <Avatar>

                                    {comment.username[0].toUpperCase()}

                                </Avatar>

                                <div>

                                    <Text fw={700}>

                                        {comment.username}

                                    </Text>

                                    <Text
                                        c="dimmed"
                                        size="sm"
                                    >

                                        {comment.created_at}

                                    </Text>

                                </div>

                            </Group>

                            <Badge
                                color={
                                    comment.is_replied
                                        ? "green"
                                        : "orange"
                                }
                            >

                                {
                                    comment.is_replied
                                        ? "Answered"
                                        : "Waiting"
                                }

                            </Badge>

                        </Group>

                        <Text mt="md">

                            {comment.text}

                        </Text>

                        <Group mt="lg">

                            <Button
                                leftSection={<IconBrandInstagram size={16} />}
                            >

                                Reply

                            </Button>

                            <Button
                                variant="light"
                                leftSection={<IconUserPlus size={16} />}
                            >

                                Create Lead

                            </Button>

                        </Group>

                    </Card>

                ))}

            </Stack>

        </>

    );

}