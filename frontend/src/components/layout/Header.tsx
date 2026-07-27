import {
    Group,
    Avatar,
    Badge,
    Text,
} from "@mantine/core";

import { useAuthStore } from "../../store/authStore";

export default function HeaderBar() {

    const user = useAuthStore((state) => state.user);

    return (

        <Group
            justify="space-between"
            h="100%"
            px="lg"
        >

            <Text fw={700} size="xl">
                Instagram CRM
            </Text>

            <Group>

                {user ? (

                    <>

                        <Badge
                            color="green"
                            variant="light"
                        >
                            Authorized
                        </Badge>

                        <Text>
                            @{user.username}
                        </Text>

                        <Avatar>
                            {user.username[0].toUpperCase()}
                        </Avatar>

                    </>

                ) : (

                    <Badge
                        color="red"
                        variant="light"
                    >
                        Not authorized
                    </Badge>

                )}

            </Group>

        </Group>

    );

}