import { Button } from 'antd';
import React, { useMemo } from 'react';
import { IUser } from '../interfaces/IUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCollection } from '../app/usersSlice';

const EditAction: React.FC<IUser.UserActionProps> = ({
  user,
  handleAction,
}) => {
  const dispatch = useAppDispatch();
  const { loading, collection } = useAppSelector((state) => state.users);

  return (
    <Button
      color="primary"
      variant="solid"
      loading={loading}
      onClick={() => dispatch(handleAction(user))}
    >
      Edit
    </Button>
  );
};

export default EditAction;
