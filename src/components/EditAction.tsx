import { Button } from "antd";
import React from "react";
import { IUser } from "../interfaces/IUser";

interface Prop {
    user: IUser.User,
    handleAction: any
}

const EditAction: React.FC<Prop> = ({user, handleAction}) => {

    return (<Button color="primary" variant="solid" onClick={() => handleAction(user)}>Edit</Button>);
}

export default EditAction;