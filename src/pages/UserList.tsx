import { theme, Layout, Flex, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import AuthStatus from '../components/AuthStatus';
import UserForm from '../features/UserForm';
import { IUser } from '../interfaces/IUser';
import Pagination from '../components/Pagination';
import UserCardSection from '../features/UserCardSection';
import UserTableSection from '../features/UserTableSection';
import UserHead from '../components/UserHead';
import { notification } from 'antd';
import { fetchCollection, closeModal } from '../features/usersSlice';

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

  useEffect(() => {
    dispatch(fetchCollection());
  }, [dispatch]);

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
            <UserHead view={view} toggleView={toggleView} />
            {view === 'table' ? (
              <UserTableSection users={users} />
            ) : (
              <UserCardSection />
            )}
            {users && users.length > 0 ? (
              <Flex justify="center" style={{ marginTop: '1rem' }}>
                <Flex vertical={false} justify={'center'} align={'center'}>
                  <></>
                  {/* <Pagination
                    perPage={collection?.per_page}
                    current={collection?.page}
                    total={collection?.total}
                    onPageSwitch={loadUsers}
                  /> */}
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
          onCancel={() => dispatch(closeModal())}
        >
          <UserForm />
        </Modal>
      </Layout>
    </Context.Provider>
  );
};

export default UserList;
