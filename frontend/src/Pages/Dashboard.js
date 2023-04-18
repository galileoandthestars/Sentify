import React, { useState } from "react";
import { Login } from "./Login";
import useToken from "../components/useToken";

export const Dashboard = () => {
    const { token } = useToken();

    if (!token) {
        return <Login />
    }

    return (
        <h1>Welcome</h1>
    );
}