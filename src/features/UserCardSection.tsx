import React from "react"
import { IUser } from "../interfaces/IUser"
import UserCard from "../components/UserCard"
import { Flex, Button, Row, Col } from "antd"

interface UserCardProp{
    collection: IUser.UserCollection,
    deleteAction: any,
    editAction: any
}

const UserCardSection: React.FC<UserCardProp> = ({collection, editAction, deleteAction}) => {

    return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {
            collection?.users?.map((user) => <Col className="gutter-row" span={6} key={user.id}><UserCard user={user} editAction={editAction} deleteAction={deleteAction}/></Col>)
        }
    </Row>
}

export default UserCardSection;