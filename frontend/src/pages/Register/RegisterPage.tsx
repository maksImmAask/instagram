import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

import { register } from "../../api/auth";
import type { RegisterData } from "../../types/auth";

const { Title } = Typography;

export default function RegisterPage() {
    const navigate = useNavigate();

    const onFinish = async (values: RegisterData) => {
        try {
            await register(values);

            message.success("Регистрация успешна");

            navigate("/login");
        } catch {
            message.error("Ошибка регистрации");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "#f5f5f5",
            }}
        >
            <Card style={{ width: 420 }}>
                <Title level={2}>Register</Title>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>

                    <Button htmlType="submit" type="primary" block>
                        Register
                    </Button>
                </Form>
            </Card>
        </div>
    );
}