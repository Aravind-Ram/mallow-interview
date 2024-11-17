import { Button, Popconfirm } from 'antd';
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IUser } from '../interfaces/IUser';

const DeleteAction: React.FC<IUser.UserFormProps> = ({
  user,
  handleAction,
}) => {
  return (
    <Popconfirm
      title="Delete the user"
      description="Are you sure to delete this user?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => handleAction(user)}
    >
      <Button color="danger" variant="solid">
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteAction;
