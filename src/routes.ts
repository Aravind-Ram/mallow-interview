import React from "react";

interface Route {
    path: string;
    name: string;
    component: React.ComponentType;
    isProtected: boolean;
}

const authRoutes: Route[] = [
    {
        path: "/",
        name: "login",
        component: React.lazy(() => import("./pages/Login")),
        isProtected: false,
    },
];

const userRoutes: Route[] = [
    {
        path: "/user",
        name: "User",
        component: React.lazy(() => import("./pages/UserList")),
        isProtected: true,
    }
];

const routes: Route[] = [...authRoutes, ...userRoutes];

export default routes;

