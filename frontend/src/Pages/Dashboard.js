import React from "react";
import { Login } from "./Login";
import useToken from "../components/useToken";
import { DashBoardLayout } from '../components/DashBoardLayout';
import { ProSidebarProvider } from 'react-pro-sidebar';

export const Dashboard = () => {
    const { token } = useToken();

    if (!token) {
        <Login />
    }

    return (
        <div className='dashboard-page'>
            <ProSidebarProvider>
                <DashBoardLayout />
            </ProSidebarProvider>
        </div>
    );
}