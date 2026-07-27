import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import App from "./App";import { theme } from "./theme";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <MantineProvider
            defaultColorScheme="light"
            theme={theme}
        >
            <Notifications />

            <App />

        </MantineProvider>
    </BrowserRouter>
);