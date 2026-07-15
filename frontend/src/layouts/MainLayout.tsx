import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function MainLayout() {

    return (

        <Layout
            style={{
                minHeight: "100vh",
            }}
        >

            <Sider>

                Sidebar

            </Sider>

            <Layout>

                <Header
                    style={{
                        background: "#fff",
                    }}
                >

                    Header

                </Header>

                <Content
                    style={{
                        margin: 20,
                    }}
                >

                    <Outlet />

                </Content>

            </Layout>

        </Layout>

    );

}