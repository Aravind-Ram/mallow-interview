import { Table, theme, Layout, Flex, Typography, Col, Input, Button, Avatar, Modal } from "antd";
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
import React, { useCallback, useEffect, useState } from "react"
import type { GetProps } from 'antd';
import AuthStatus from "../components/AuthStatus";
import axiosInstance from "../axios";
import UserForm from "../components/UserForm";
import { IUser } from "../interfaces/IUser";
import DeleteAction from "../components/DeleteAction";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

type SearchProps = GetProps<typeof Input.Search>;

const UserList: React.FC = () => {

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
            render: (record: IUser.User) => <>
                <Button color="primary" variant="solid" onClick={(e) => editUser(record)}>Edit</Button>
                <DeleteAction user={record} handleAction={deleteUser} />
            </>,
        },
    ];

    const {
        token: { borderRadiusLG, colorBgContainer },
    } = theme.useToken();

    const [users, setUsers] = useState<IUser.UserCollection>();

    const [selectedUser, setSelectedUser] = useState<IUser.User | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadUsers(1)
    }, []);

    const editUser = (user: IUser.User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    }

    const deleteUser = (user: IUser.User) => {
        axiosInstance.delete(`/users/${user?.id}`)
            .then(res => {
                loadUsers(users?.page ?? 1);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const loadUsers = useCallback((page: number) => {
        axiosInstance.get("/users?page=" + page)
            .then(res => {
                let userCollection = { ...res.data, users: res.data.data };
                setUsers(userCollection);
            })
            .catch(err => {
                console.error(err);
            });
    }, [])

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const createUser = () => {
        setIsModalOpen(true)
    }

    const handleUserCreate = useCallback((data: IUser.User) => {
        axiosInstance.post("/auth/register", data)
            .then(res => {
                loadUsers(users?.page ?? 1);
                setIsModalOpen(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, [])

    const handleUserUpdate = useCallback((data: IUser.User) => {
        axiosInstance.post(`/user/${selectedUser?.id}`, data)
            .then(res => {
                loadUsers(users?.page ?? 1);
                setIsModalOpen(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, [selectedUser])

    const filterUsers = (query: string) => {
        const filtered: IUser.User[] = users?.data?.filter((user) =>
            user.first_name.toLowerCase().includes(query.toLowerCase()) || user.last_name.toLowerCase().includes(query.toLowerCase())
        ) ?? [];
        (!filtered) ? setUsers({...users, users: users?.data}) : setUsers({...users, users: filtered})        
    };

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
                            <Search handleFilter={filterUsers} />
                            <Button type="primary" style={{ marginLeft: "1rem" }} onClick={createUser}>Create User</Button>
                        </Col>
                    </Flex>
                    <Flex vertical={false} justify={'flex-start'} align={'center'}>
                        <Button color="primary" variant="outlined" icon={<TableOutlined />}>Table</Button>
                        <Button color="default" variant="outlined" icon={<UnorderedListOutlined />}>Card</Button>
                    </Flex>
                </Flex>
                <Table dataSource={users?.users} columns={columns} rowKey="id" pagination={false} />
                {
                    users && users?.data && users?.data.length > 0 ? <Flex justify="center" style={{ marginTop: "1rem" }}>
                        <Flex vertical={false} justify={'center'} align={'center'}>
                            <Pagination perPage={users?.per_page} current={users?.page} total={users?.total} onPageSwitch={loadUsers} />
                        </Flex>
                    </Flex> : <></>
                }
            </div>
        </Content>
        <Modal title={selectedUser ? 'Edit User' : 'Create User'} open={isModalOpen} footer={null} onCancel={handleCancel}>
            <UserForm user={selectedUser} handleAction={selectedUser ? handleUserUpdate : handleUserCreate} />
        </Modal>
    </Layout>;
}

export default UserList
