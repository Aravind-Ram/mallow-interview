import { Button, Col, Flex, Typography } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Search from './Search';
import React from 'react';

interface Prop {
  filterUsers: any;
  createUser: any;
  view: string;
  toggleView: any;
}

const UserHead: React.FC<Prop> = ({
  filterUsers,
  createUser,
  toggleView,
  view,
}) => {
  return (
    <Flex align="space-between" vertical style={{ marginBottom: '1rem' }}>
      <Flex vertical={false} justify={'space-between'} align={'center'}>
        <Typography.Paragraph strong>Users</Typography.Paragraph>
        <Col>
          <Search handleFilter={filterUsers} />
          <Button
            type="primary"
            style={{ marginLeft: '1rem' }}
            onClick={createUser}
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
