import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { decryptData } from "../utils/crypto";
import { Button, Flex, Typography } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { IAuth } from "../interfaces/IAuth";

const AuthStatus: React.FC = () => {

    const auth: IAuth.AuthContextType = useAuth();
    const navigate = useNavigate();

    const authUser = decryptData(auth.user);

    if (!auth.user) {
        return <Typography.Paragraph>You are not logged in.</Typography.Paragraph>;
    }

    return (
        <Flex style={{
            width: '100%',
        }} align="center" vertical={false}>
            <Flex style={{
                width: '100%',
            }} justify={'space-between'} vertical={false} align={'center'}>
                <Typography.Title type="warning" level={4}>
                    Welcome {authUser.email}!
                </Typography.Title>

                <Button color="danger" icon={<LogoutOutlined />} onClick={() => {
                    auth.signout(() => navigate("/"));
                }}>
                    Sign out
                </Button>
            </Flex>
        </Flex>
    );
}
export default AuthStatus;
