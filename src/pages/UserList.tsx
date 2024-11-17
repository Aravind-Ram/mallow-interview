import { Table, theme, Layout, Flex, Typography, Col, Input, Button, Avatar, Modal } from "antd";
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react"
import type { GetProps } from 'antd';
import AuthStatus from "../components/AuthStatus";
import axiosInstance from "../axios";

type SearchProps = GetProps<typeof Input.Search>;

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string
}

const UserList: React.FC = () => {

    const {
        token: { borderRadiusLG, colorBgContainer },
    } = theme.useToken();

    const [users, setUsers] = useState<IUser[]>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const editUser = (user: IUser) => {
        // axiosInstance.delete('/users/1');
        setIsModalOpen(true);
    }

    const deleteUser = (user: IUser) => {
        // axiosInstance.delete('/users/1');
    }

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text: string) => <><Avatar size={64} src={text} /></>,
        },
        {
            title: 'Email address',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record: IUser) => <>
                <Button color="primary" variant="solid" onClick={(e) => editUser(record)}>Edit</Button>
                <Button color="danger" variant="solid" onClick={(e) => deleteUser(record)}>Delete</Button>
            </>,
        },
    ];

    useEffect(() => {
        axiosInstance.get("/users")
            .then(res => {
                const data = res.data;
                setUsers(data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return <Layout style={{ height: "100vh" }}>
        <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
            <AuthStatus />
        </Layout.Header>
        <Content style={{ padding: '20px 48px' }}>
            <div
                style={{
                    background: colorBgContainer,
                    minHeight: 280,
                    padding: 24,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Flex align="space-between" vertical>
                    <Flex vertical={false} justify={'space-between'} align={'center'}>
                        <Typography.Paragraph strong>Users</Typography.Paragraph>
                        <Col>
                            <Input.Search placeholder="Search user" allowClear onSearch={onSearch} style={{ width: 200 }} />
                            <Button type="primary" style={{ marginLeft: "1rem" }}>Create User</Button>
                        </Col>
                    </Flex>
                    <Flex vertical={false} justify={'flex-start'} align={'center'}>
                        <Button color="primary" variant="outlined" icon={<TableOutlined />}>Table</Button>
                        <Button color="default" variant="outlined" icon={<UnorderedListOutlined />}>Card</Button>
                    </Flex>
                </Flex>
                <Table dataSource={users} columns={columns} rowKey="id" />
            </div>
        </Content>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </Layout>;
}

export default UserList
