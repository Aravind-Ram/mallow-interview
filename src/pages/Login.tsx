import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Row,
  Button,
  Checkbox,
  Form,
  Input,
  theme,
  Flex,
  Alert,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axios';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const [authError, setAuthError] = useState(false);

  const navigate = useNavigate();

  const auth = useAuth();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (
      process.env.REACT_APP_AUTH_EMAIL === values.email &&
      process.env.REACT_APP_AUTH_PASSWORD === values.password
    ) {
      axiosInstance
        .post('/auth/login', values)
        .then((res) => {
          auth.signin(res.data, () => {
            navigate('/user', { replace: true });
            setAuthError(false);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setAuthError(true);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row gutter={16}>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Card
          title="Sign In"
          size="default"
          style={{
            background: '#fafafa',
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop: '5%',
          }}
        >
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
              <Input
                type="email"
                placeholder="Email address"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined />}
              />
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
            {authError ? (
              <Alert
                description="Incorrect email or password."
                type="error"
                showIcon
              />
            ) : (
              <></>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
