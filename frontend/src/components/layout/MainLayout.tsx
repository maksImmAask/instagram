import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import HeaderBar from "./Header";

export default function MainLayout() {

    return (

        <AppShell

            navbar={{
                width: 260,
                breakpoint: "sm",
            }}

            header={{
                height: 70,
            }}

            padding="lg"

        >

            <AppShell.Navbar>

                <Sidebar />

            </AppShell.Navbar>

            <AppShell.Header>

                <HeaderBar />

            </AppShell.Header>

            <AppShell.Main
                bg="#f8f9fa"
            >

                <Outlet />

            </AppShell.Main>

        </AppShell>

    );

}