import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }: { children: JSX.Element }) {
    let {user, loading} = useAuth();
    let location = useLocation();    

    if(loading) {
        return <>Validating authentication...</>
    }

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;