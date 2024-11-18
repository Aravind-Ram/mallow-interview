import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { IUser } from '../interfaces/IUser';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { createUser, fetchCollection, updateUser } from '../app/usersSlice';

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
};

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedUser, loading, collection } = useAppSelector(
    (state) => state.users,
  );

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (selectedUser) {
      dispatch(updateUser(values)).then((result: any) => {
        if (updateUser.fulfilled.match(result)) {
          dispatch(fetchCollection(collection?.page ?? null));
        }
      });
    } else {
      dispatch(createUser(values)).then((result: any) => {
        if (createUser.fulfilled.match(result)) {
          dispatch(fetchCollection(collection?.page ?? null));
        }
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="user"
      initialValues={{
        first_name: selectedUser?.first_name,
        last_name: selectedUser?.last_name,
        email: selectedUser?.email,
        avatar: selectedUser?.avatar,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="first_name"
        label="First name"
        rules={[
          { required: true, message: 'Please input first name' },
          { max: 100, message: 'Name should be less than 100 character' },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item<FieldType>
        name="last_name"
        label="Last name"
        rules={[
          { required: true, message: 'Please enter last name' },
          { max: 100, message: 'Name should be less than 100 character' },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item<FieldType>
        name="email"
        label="Email address"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please enter valid email address!',
          },
        ]}
      >
        <Input type="email" placeholder="Email address" />
      </Form.Item>

      <Form.Item<FieldType>
        name="avatar"
        label="Profile Image URL"
        rules={[
          { required: true, message: 'Please enter profile image URL' },
          { type: 'url', message: 'Please enter valid URL' },
        ]}
      >
        <Input placeholder="Profile Image URL" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" loading={loading} htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
