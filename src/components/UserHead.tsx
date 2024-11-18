import { Button, Col, Flex, Typography } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Search from './Search';
import React from 'react';
import { toggleCreate } from '../features/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleViewMode } from '../features/usersSlice';

const UserHead: React.FC = () => {
  const dispatch = useAppDispatch();

  const { viewMode, loading } = useAppSelector((state) => state.users);

  return (
    <Flex align="space-between" vertical style={{ marginBottom: '1rem' }}>
      <Flex vertical={false} justify={'space-between'} align={'center'}>
        <Typography.Paragraph strong>Users</Typography.Paragraph>
        <Col>
          <Search />
          <Button
            type="primary"
            style={{ marginLeft: '1rem' }}
            loading={loading}
            onClick={() => dispatch(toggleCreate())}
          >
            Create User
          </Button>
        </Col>
      </Flex>
      <Flex vertical={false} justify={'flex-start'} align={'center'}>
        <Button
          color={viewMode === 'table' ? 'primary' : 'default'}
          variant="outlined"
          icon={<TableOutlined />}
          loading={loading}
          onClick={() => dispatch(toggleViewMode('table'))}
        >
          Table
        </Button>
        <Button
          color={viewMode === 'card' ? 'primary' : 'default'}
          variant="outlined"
          icon={<UnorderedListOutlined />}
          loading={loading}
          onClick={() => dispatch(toggleViewMode('card'))}
        >
          Card
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserHead;
