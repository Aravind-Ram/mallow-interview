import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { IUser } from '../interfaces/IUser';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

const { Meta } = Card;

interface CardProp {
    user: IUser.User,
    editAction: any,
    deleteAction: any,
}

const UserCard: React.FC<CardProp> = ({user, editAction, deleteAction}) => (
    <Card
        style={{ margin: '10px' }}
        cover={
            <img
                alt={user.first_name}
                src={user.avatar}
            />
        }
        actions={[            
            <EditAction user={user} handleAction={editAction} />,
            <DeleteAction key="delete" user={user} handleAction={deleteAction}/>,
        ]}
    >
        <Meta
            title={user.first_name + ' ' + user.last_name}
            description={user.email}
        />
    </Card>
);

export default UserCard;