import { createContext, useState, useEffect } from "react";
import * as authApi from "../../../api/auth";
import { toast } from "react-toastify";
import { getToken, storeToken, clearToken } from "../../../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isAdminMode, setIsAdminMode] = useState(false);

    useEffect(() => {
        if (getToken()) {
            authApi
                .fetchMe()
                .then(res => {
                    setAuthUser(res.data.user)
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                }).finally(() => setInitialLoading(false))
        } else {
            setInitialLoading(false);
        }
    }, []);

    const register = async user => {
        const res = await authApi.register(user);
        setAuthUser(res.data.newUser);
        storeToken(res.data.token);
    };

    const login = async credential => {
        const res = await authApi.login(credential);
        if (res.data.user.deletedAt) {
            toast.error("user is inactive");
        } else {
            setAuthUser(res.data.user);
            storeToken(res.data.token);
            toast.success("login successfully");
        }
    }

    const logout = () => {
        setAuthUser(null);
        clearToken();
    }

    return (
        <AuthContext.Provider value={{ register, login, logout, authUser, initialLoading, isAdminMode, setIsAdminMode }}>
            {children}
        </AuthContext.Provider>
    )
}