import { useEffect, useState } from "react";

import {
    Badge,
    Card,
    Grid,
    Group,
    Image,
    Loader,
    Stack,
    Text,
} from "@mantine/core";

import {
    IconHeart,
    IconMessageCircle,
} from "@tabler/icons-react";

import { getPosts, type Post } from "../../api/posts";

export default function PostsPage() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getPosts()
            .then(setPosts)
            .finally(() => setLoading(false));

    }, []);

    if (loading) {
        return <Loader />;
    }

    return (

        <Grid>

            {posts.map((post) => (

                <Grid.Col
                    span={{ base: 12, md: 6, xl: 4 }}
                    key={post.id}
                >

                    <Card
                        shadow="md"
                        radius="lg"
                        withBorder
                    >

                        <Card.Section>

                            <Image
                                src={post.image}
                                h={300}
                            />

                        </Card.Section>

                        <Stack mt="md">

                            <Text fw={700}>
                                {post.caption}
                            </Text>

                            <Group>

                                <Badge
                                    color="red"
                                    leftSection={<IconHeart size={14} />}
                                >
                                    {post.likes}
                                </Badge>

                                <Badge
                                    color="blue"
                                    leftSection={<IconMessageCircle size={14} />}
                                >
                                    {post.comments_count}
                                </Badge>

                            </Group>

                        </Stack>

                    </Card>

                </Grid.Col>

            ))}

        </Grid>

    );

}