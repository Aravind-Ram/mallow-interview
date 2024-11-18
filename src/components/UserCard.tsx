import React from 'react';
import { Card } from 'antd';
import { IUser } from '../interfaces/IUser';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';
import { toggleEdit } from '../features/usersSlice';

const { Meta } = Card;

interface Prop {
  user: IUser.User;
  deleteAction: any;
}

const UserCard: React.FC<Prop> = ({ user, deleteAction }) => (
  <Card
    style={{ margin: '10px' }}
    cover={<img alt={user.first_name} src={user.avatar} />}
    actions={[
      <EditAction
        key={`edit${user.id}`}
        user={user}
        handleAction={toggleEdit}
      />,
      <DeleteAction
        key={`delete${user.id}`}
        user={user}
        handleAction={deleteAction}
      />,
    ]}
  >
    <Meta
      title={user.first_name + ' ' + user.last_name}
      description={user.email}
    />
  </Card>
);

export default UserCard;
