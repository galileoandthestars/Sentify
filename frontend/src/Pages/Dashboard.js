import React, { useState } from "react";
import { Login } from "./Login";
import useToken from "../components/useToken";

export const Dashboard = () => {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <h1>Welcome</h1>
    );
}