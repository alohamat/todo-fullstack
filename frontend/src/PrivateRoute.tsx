import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import type { ReactNode } from "react";

type PrivateRouteProps = { children: ReactNode };

function PrivateRoute({ children }: PrivateRouteProps) {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        if (!token && refreshToken) {
            axios.post("https://todo-fullstack-production-e159.up.railway.app/api/refresh", { refresh_token: refreshToken })
                .then(res => {
                    const newToken = res.data.access_token;
                    localStorage.setItem("access_token", newToken);
                    setAccessToken(newToken);
                })
                .catch(() => setAccessToken(null))
                .finally(() => setLoading(false));
        } else {
            setAccessToken(token);
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    // what to do if not logged in
    if (!accessToken) return <Navigate to="/register" replace />;

    return <>{children}</>;
}

export default PrivateRoute;
