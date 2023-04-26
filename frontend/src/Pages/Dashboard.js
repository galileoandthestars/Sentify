import React from "react";
import { Login } from "./Login";
import useToken from "../components/useToken";
import { DashBoardLayout } from '../components/DashBoardLayout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { toggleScroll } from "../components/toggleScroll";

export const Dashboard = () => {
    const { token } = useToken();

    if (!token) {
        return <Login />
    }

    const { scroll, setScroll } = toggleScroll();

    if (scroll) {
        setScroll(true);
    }

    return (
        <div className='dashboard-page'>
            <ProSidebarProvider>
                <DashBoardLayout />
            </ProSidebarProvider>
        </div>
    );
}