import { Button } from 'antd';
import React from 'react';
import { IUser } from '../interfaces/IUser';
import { useAppDispatch } from '../app/hooks';

const EditAction: React.FC<IUser.UserActionProps> = ({
  user,
  handleAction,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      color="primary"
      variant="solid"
      onClick={() => dispatch(handleAction(user))}
    >
      Edit
    </Button>
  );
};

export default EditAction;
