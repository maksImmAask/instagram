import {
    Stack,
    NavLink,
    Text,
    Avatar,
    Group,
    Divider,
} from "@mantine/core";

import {
    IconHome2,
    IconBrandInstagram,
    IconUsers,
    IconChecklist,
    IconMessageCircle,
    IconSettings,
} from "@tabler/icons-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

export default function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    const user = useAuthStore((state) => state.user);

    return (

        <Stack
            h="100%"
            justify="space-between"
            p="lg"
        >

            <div>

                <Text
                    fw={800}
                    size="28px"
                    mb="xl"
                >
                    Instagram CRM
                </Text>

                <NavLink
                    active={location.pathname === "/"}
                    label="Dashboard"
                    leftSection={<IconHome2 size={18} />}
                    onClick={() => navigate("/")}
                />

                <NavLink
                    active={location.pathname === "/posts"}
                    label="Posts"
                    leftSection={<IconBrandInstagram size={18} />}
                    onClick={() => navigate("/posts")}
                />

                <NavLink
                    active={location.pathname === "/comments"}
                    label="Comments"
                    leftSection={<IconMessageCircle size={18} />}
                    onClick={() => navigate("/comments")}
                />

                <NavLink
                    active={location.pathname === "/leads"}
                    label="Leads"
                    leftSection={<IconUsers size={18} />}
                    onClick={() => navigate("/leads")}
                />

                <NavLink
                    active={location.pathname === "/tasks"}
                    label="Tasks"
                    leftSection={<IconChecklist size={18} />}
                    onClick={() => navigate("/tasks")}
                />

                <NavLink
                    active={location.pathname === "/settings"}
                    label="Settings"
                    leftSection={<IconSettings size={18} />}
                    onClick={() => navigate("/settings")}
                />

            </div>

            <div>

                <Divider mb="md" />

                <Group>

                    <Avatar
                        radius="xl"
                        size="lg"
                    >
                        {user?.username?.[0]?.toUpperCase() ?? "?"}
                    </Avatar>

                    <div>

                        <Text fw={700}>
                            {user?.username ?? "Guest"}
                        </Text>

                        <Text
                            size="sm"
                            c="dimmed"
                        >
                            {user?.email ?? "Not authorized"}
                        </Text>

                    </div>

                </Group>

            </div>

        </Stack>

    );

}