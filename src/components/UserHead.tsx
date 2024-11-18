import { Button, Col, Flex, Typography } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Search from './Search';
import React from 'react';
import { toggleCreate } from '../features/usersSlice';
import { useAppDispatch } from '../app/hooks';

interface Prop {
  view: string;
  toggleView: any;
}

const UserHead: React.FC<Prop> = ({ toggleView, view }) => {
  const dispatch = useAppDispatch();
  return (
    <Flex align="space-between" vertical style={{ marginBottom: '1rem' }}>
      <Flex vertical={false} justify={'space-between'} align={'center'}>
        <Typography.Paragraph strong>Users</Typography.Paragraph>
        <Col>
          <Search />
          <Button
            type="primary"
            style={{ marginLeft: '1rem' }}
            onClick={() => dispatch(toggleCreate())}
          >
            Create User
          </Button>
        </Col>
      </Flex>
      <Flex vertical={false} justify={'flex-start'} align={'center'}>
        <Button
          color={view === 'table' ? 'primary' : 'default'}
          variant="outlined"
          icon={<TableOutlined />}
          onClick={() => toggleView('table')}
        >
          Table
        </Button>
        <Button
          color={view === 'card' ? 'primary' : 'default'}
          variant="outlined"
          icon={<UnorderedListOutlined />}
          onClick={() => toggleView('card')}
        >
          Card
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserHead;
