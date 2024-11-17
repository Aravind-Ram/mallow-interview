import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { IUser } from '../interfaces/IUser';

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
};

const UserForm: React.FC<IUser.UserFormProps> = ({ user, handleAction }) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    handleAction(values);
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
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        avatar: user?.avatar,
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
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
