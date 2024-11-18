import React from 'react';
import UserCard from '../components/UserCard';
import { Row, Col, Card } from 'antd';
import { useAppSelector } from '../app/hooks';
import { deleteUser } from '../app/usersSlice';

const UserCardSection: React.FC = () => {
  const { users, loading, error } = useAppSelector((state) => state.users);

  return users ? (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {users.map((user) => (
        <Col className="gutter-row" span={6} key={user.id}>
          <UserCard loading={loading} user={user} deleteAction={deleteUser} />
        </Col>
      ))}
    </Row>
  ) : loading ? (
    <Card loading={loading} style={{ margin: '10px' }} />
  ) : (
    <></>
  );
};

export default UserCardSection;
