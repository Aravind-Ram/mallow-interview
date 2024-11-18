import { Button } from 'antd';
import React from 'react';
import { IUser } from '../interfaces/IUser';
import { useAppDispatch } from '../app/hooks';

interface Prop {
  user: IUser.User;
  handleAction: any;
}

const EditAction: React.FC<Prop> = ({ user, handleAction }) => {
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
