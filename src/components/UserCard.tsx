import React from 'react';
import { Card } from 'antd';
import { IUser } from '../interfaces/IUser';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

const { Meta } = Card;

interface Prop {
  user: IUser.User;
  editAction: any;
  deleteAction: any;
}

const UserCard: React.FC<Prop> = ({ user, editAction, deleteAction }) => (
  <Card
    loading={true}
    style={{ margin: '10px' }}
    cover={<img alt={user.first_name} src={user.avatar} />}
    actions={[
      <EditAction
        key={`edit${user.id}`}
        user={user}
        handleAction={editAction}
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
