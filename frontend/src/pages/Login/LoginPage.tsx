import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { LoginFormValues } from "../../types/auth";
import { login, me } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";

const { Title } = Typography;

export default function LoginPage() {

    const navigate = useNavigate();

    const setTokens = useAuthStore((state) => state.setTokens);

    const setUser = useAuthStore((state) => state.setUser);

    const onFinish = async (values: LoginFormValues) => {

        try {

            const tokens = await login(values);

            setTokens(
                tokens.access,
                tokens.refresh
            );

            const user = await me();

            setUser(user);

            message.success("Добро пожаловать!");

            navigate("/");

        } catch {

            message.error("Неверный логин или пароль");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f5f5f5",
            }}
        >

            <Card
                style={{
                    width: 400,
                }}
            >

                <Title
                    level={2}
                    style={{
                        textAlign: "center",
                    }}
                >
                    Instagram CRM
                </Title>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >

                        <Input />

                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >

                        <Input.Password />

                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Login
                    </Button>

                </Form>

            </Card>

        </div>

    );

}