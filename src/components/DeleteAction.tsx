import { Button, Popconfirm } from 'antd';
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IUser } from '../interfaces/IUser';
import { useAppDispatch } from '../app/hooks';

const DeleteAction: React.FC<IUser.UserActionProps> = ({
  user,
  handleAction,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Popconfirm
      title="Delete the user"
      description="Are you sure to delete this user?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => dispatch(handleAction(user))}
    >
      <Button color="danger" variant="solid">
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteAction;
