import { Card, Group, Text, ThemeIcon } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
    title: string;
    value: number;
    icon: ReactNode;
}

export default function StatisticCard({
    title,
    value,
    icon,
}: Props) {
    return (
        <Card shadow="sm" radius="lg" withBorder p="lg">

            <Group justify="space-between">

                <div>

                    <Text c="dimmed" size="sm">
                        {title}
                    </Text>

                    <Text fw={700} size="32px">
                        {value}
                    </Text>

                </div>

                <ThemeIcon
                    size={54}
                    radius="xl"
                    variant="light"
                >
                    {icon}
                </ThemeIcon>

            </Group>

        </Card>
    );
}