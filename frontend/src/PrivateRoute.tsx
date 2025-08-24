import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import type { ReactNode } from "react";

type PrivateRouteProps = { children: ReactNode };

function PrivateRoute({ children }: PrivateRouteProps) {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));

    const refreshToken = localStorage.getItem("refresh_token");

    useEffect(() => {
        if (!accessToken && refreshToken) {
            axios.post("http://localhost:5173/api/refresh", { refresh_token: refreshToken })
                .then(res => {
                    const newToken = res.data.access_token;
                    localStorage.setItem("access_token", newToken);
                    setAccessToken(newToken);
                })
                .catch(() => setAccessToken(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [accessToken, refreshToken]);

    if (loading) return <div>Loading...</div>;
    if (!accessToken) return <Navigate to="/register" replace />;

    return <>{children}</>;
}

export default PrivateRoute;
