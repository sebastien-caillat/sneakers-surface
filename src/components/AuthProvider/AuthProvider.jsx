import React, { useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { message } from "antd"
import { BEARER } from "../../constant"
import { useEffect } from "react"
import { getToken } from "../../helpers"

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const authToken = getToken();

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/me`, {
                headers: {
                    "Authorization": `${BEARER} ${token}`
                }
            });
            const data = await response.json();

            setUserData(data);
        } catch(error) {
            console.error(error);
            message.error("Error While Getting Logged In User Details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUser = (user) => {
        setUserData(user);
    };

    useEffect(() => {
        if(authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
