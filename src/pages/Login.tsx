import React from 'react';
import type { FormProps } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Card, Col, Row, Button, Checkbox, Form, Input, theme, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axios';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {

    let navigate = useNavigate();

    const auth = useAuth();

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        // let user: any = { email: values.email, password: values.password };
        const response = axiosInstance.post("/auth/login", values)
            .then(res => {
                console.log(res);
            });
        // const { token } = response.data;
        // console.log(token);
        // localStorage.setItem("authToken", token);
        // return response.data;
    };

    // auth.signin(user, () => {
    //     navigate('/user', { replace: true });
    // });


    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <Row gutter={16}>
        <Col
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1
            }}
        >
            <Card title="Sign In" size="default" style={{
                background: "#fafafa",
                padding: 24,
                borderRadius: borderRadiusLG,
                marginTop: "5%"
            }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email address!' },
                        ]}
                    >
                        <Input placeholder="Email" prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked">
                        <Flex justify="space-between" align="center">
                            <Checkbox>Remember me</Checkbox>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
};

export default Login;