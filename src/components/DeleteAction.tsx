import { Button, Popconfirm } from 'antd';
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IUser } from '../interfaces/IUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCollection } from '../app/usersSlice';

const DeleteAction: React.FC<IUser.UserActionProps> = ({
  user,
  handleAction,
}) => {
  const dispatch = useAppDispatch();
  const { collection } = useAppSelector((state) => state.users);

  return (
    <Popconfirm
      title="Delete the user"
      description="Are you sure to delete this user?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() =>
        dispatch(handleAction(user)).then((result: any) => {
          if (handleAction.fulfilled.match(result)) {
            dispatch(fetchCollection(collection?.page ?? null));
          }
        })
      }
    >
      <Button color="danger" variant="solid">
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteAction;
