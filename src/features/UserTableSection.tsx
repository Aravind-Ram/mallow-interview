import React from 'react';
import { IUser } from '../interfaces/IUser';
import EditAction from '../components/EditAction';
import DeleteAction from '../components/DeleteAction';
import { Avatar, Table } from 'antd';

interface Prop {
  collection: IUser.Collection | null;
  users: IUser.User[] | null;
  deleteAction: any;
  editAction: any;
}

const UserTableSection: React.FC<Prop> = ({
  collection,
  users,
  editAction,
  deleteAction,
}) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string) => (
        <>
          <Avatar size={64} src={text} />
        </>
      ),
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
      render: (record: IUser.User) => (
        <>
          <EditAction user={record} handleAction={editAction} />
          <DeleteAction user={record} handleAction={deleteAction} />
        </>
      ),
    },
  ];

  return users ? (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  ) : (
    <></>
  );
};

export default UserTableSection;
