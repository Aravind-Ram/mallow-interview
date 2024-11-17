import { theme, Layout, Flex, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useCallback, useEffect, useState } from 'react';
import AuthStatus from '../components/AuthStatus';
import axiosInstance from '../axios';
import UserForm from '../features/UserForm';
import { IUser } from '../interfaces/IUser';
import Pagination from '../components/Pagination';
import UserCardSection from '../features/UserCardSection';
import UserTableSection from '../features/UserTableSection';
import UserHead from '../components/UserHead';

const UserList: React.FC = () => {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const [view, setView] = useState<string>('table');

  const [users, setUsers] = useState<IUser.UserCollection>({});

  const [selectedUser, setSelectedUser] = useState<IUser.User | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUsers(1);
  });

  const editUser = (user: IUser.User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteUser = (user: IUser.User) => {
    axiosInstance
      .delete(`/users/${user?.id}`)
      .then(() => {
        loadUsers(users?.page ?? 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadUsers = useCallback((page: number) => {
    axiosInstance
      .get('/users?page=' + page)
      .then((res) => {
        const userCollection = { ...res.data, users: res.data.data };
        setUsers(userCollection);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createUser = () => {
    setIsModalOpen(true);
  };

  const handleUserCreate = useCallback((data: IUser.User) => {
    axiosInstance
      .post('/auth/register', data)
      .then(() => {
        loadUsers(users?.page ?? 1);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUserUpdate = useCallback(
    (data: IUser.User) => {
      axiosInstance
        .post(`/user/${selectedUser?.id}`, data)
        .then(() => {
          loadUsers(users?.page ?? 1);
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [selectedUser],
  );

  const filterUsers = (query: string) => {
    if (query.length <= 2) {
      setUsers({ ...users, users: users?.data });
    } else {
      const filtered: IUser.User[] =
        users?.data?.filter(
          (user) =>
            user.first_name.toLowerCase().includes(query.toLowerCase()) ||
            user.last_name.toLowerCase().includes(query.toLowerCase()),
        ) ?? [];
      setUsers({ ...users, users: filtered });
    }
  };

  const toggleView = (mode: string) => {
    setView(mode);
  };

  return (
    <Layout style={{ height: '100vh' }}>
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
          <UserHead
            filterUsers={filterUsers}
            view={view}
            createUser={createUser}
            toggleView={toggleView}
          />
          {view === 'table' ? (
            <UserTableSection
              collection={users}
              editAction={editUser}
              deleteAction={deleteUser}
            />
          ) : (
            <UserCardSection
              collection={users}
              editAction={editUser}
              deleteAction={deleteUser}
            />
          )}
          {users && users?.data && users?.data.length > 0 ? (
            <Flex justify="center" style={{ marginTop: '1rem' }}>
              <Flex vertical={false} justify={'center'} align={'center'}>
                <Pagination
                  perPage={users?.per_page}
                  current={users?.page}
                  total={users?.total}
                  onPageSwitch={loadUsers}
                />
              </Flex>
            </Flex>
          ) : (
            <></>
          )}
        </div>
      </Content>
      <Modal
        title={selectedUser ? 'Edit User' : 'Create User'}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <UserForm
          user={selectedUser}
          handleAction={selectedUser ? handleUserUpdate : handleUserCreate}
        />
      </Modal>
    </Layout>
  );
};

export default UserList;
