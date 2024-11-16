import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const AuthStatus: React.FC = () => {

    let auth: any = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}
export default AuthStatus;
