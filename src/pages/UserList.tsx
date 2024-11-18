import { theme, Layout, Flex, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import AuthStatus from '../components/AuthStatus';
import axiosInstance from '../axios';
import UserForm from '../features/UserForm';
import { IUser } from '../interfaces/IUser';
import Pagination from '../components/Pagination';
import UserCardSection from '../features/UserCardSection';
import UserTableSection from '../features/UserTableSection';
import UserHead from '../components/UserHead';
import { notification } from 'antd';
import { fetchCollection, toggleEditOff } from '../features/usersSlice';

const Context = React.createContext({ name: 'Default' });

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, collection, selectedUser, openModal, loading, error } =
    useAppSelector((state) => state.users);

  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const toastr = (message: string) => {
    api['success']({
      message: 'Weldone!',
      description: message,
      placement: 'topRight',
    });
  };

  const [view, setView] = useState<string>('table');

  // const [users, setUsers] = useState<IUser.UserCollection>({});

  // const [selectedUser, setSelectedUser] = useState<IUser.User | null>(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCollection());
  }, [dispatch]);

  const editUser = (user: IUser.User) => {
    // setSelectedUser(user);
    // setIsModalOpen(true);
  };

  const deleteUser = (user: IUser.User) => {
    axiosInstance
      .delete(`/users/${user?.id}`)
      .then(() => {
        // loadUsers(users?.page ?? 1); Getting response 200 all API request but actually not reflected to the api so manually did it
        // const filtered: IUser.User[] =
        //   users?.data?.filter((iuser) => iuser.id !== user?.id) ?? [];
        // setUsers({ ...users, users: filtered });
        toastr('User has been deleted');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadUsers = useCallback((page: number) => {
    axiosInstance
      .get('/users?page=' + page)
      .then((res) => {
        // const userCollection = { ...res.data, users: res.data.data };
        // setUsers(userCollection);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCancel = () => {
    // setIsModalOpen(false);
  };

  const createUser = () => {
    // setIsModalOpen(true);
  };

  const handleUserCreate = useCallback((data: IUser.User) => {
    axiosInstance
      .post('/auth/register', data)
      .then(() => {
        // loadUsers(users?.page ?? 1);
        // setIsModalOpen(false);
        // toastr('User has been created');
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
          // loadUsers(users?.page ?? 1);
          // const filtered: IUser.User[] =
          //   users?.data?.filter((user) => user.id !== selectedUser?.id) ?? [];
          // setUsers({ ...users, users: filtered });
          // setIsModalOpen(false);
          toastr('User has been updated');
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [selectedUser],
  );

  const filterUsers = (query: string) => {
    // if (query.length <= 2) {
    //   setUsers({ ...users, users: users?.data });
    // } else {
    //   const filtered: IUser.User[] =
    //     users?.data?.filter(
    //       (user) =>
    //         user.first_name.toLowerCase().includes(query.toLowerCase()) ||
    //         user.last_name.toLowerCase().includes(query.toLowerCase()),
    //     ) ?? [];
    //   setUsers({ ...users, users: filtered });
    // }
  };

  const toggleView = (mode: string) => {
    setView(mode);
  };

  const [api, contextHolder] = notification.useNotification();

  const contextValue = useMemo(() => ({ name: 'Mallow Interview' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
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
                collection={collection}
                users={users}
                editAction={editUser}
                deleteAction={deleteUser}
              />
            ) : (
              <UserCardSection
                editAction={editUser}
                deleteAction={deleteUser}
              />
            )}
            {users && users.length > 0 ? (
              <Flex justify="center" style={{ marginTop: '1rem' }}>
                <Flex vertical={false} justify={'center'} align={'center'}>
                  <Pagination
                    perPage={collection?.per_page}
                    current={collection?.page}
                    total={collection?.total}
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
          open={openModal}
          footer={null}
          onCancel={() => dispatch(toggleEditOff())}
        >
          <UserForm
            user={selectedUser}
            handleAction={selectedUser ? handleUserUpdate : handleUserCreate}
          />
        </Modal>
      </Layout>
    </Context.Provider>
  );
};

export default UserList;
