import React, { createContext, useContext, useEffect } from "react";
import { fakeAuthProvider } from "../auth";
import { UserTypes } from "../types/UserTypes";


interface AuthContextType {
    user: {
        email: string,
        password: string
    };
    loading: boolean;
    signin: (user: UserTypes.authUser, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    
    let [user, setUser] = React.useState<any>(null);

    const [loading, setLoading] = React.useState<boolean>(true);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            localStorage.setItem('authUser', JSON.stringify(newUser));
            setUser(newUser);
            callback();
        });
    };

    // Check localStorage on app load
    useEffect(() => {
        const authUser = localStorage.getItem("authUser");
        if (authUser) {
            setUser(JSON.parse(authUser));
        }
        setLoading(false)
    }, []);

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            localStorage.removeItem("authUser");
            setUser(null);
            callback();
        });
    };

    let value: any = { user, loading, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {

    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

