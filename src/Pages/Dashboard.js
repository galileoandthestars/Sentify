import React from 'react';
import { DashBoardLayout } from '../components/DashBoardLayout';
import { ProSidebarProvider } from 'react-pro-sidebar';



export const Dashboard =()=>{
    return(
        <div className='dashboard-page'>
            <ProSidebarProvider>
                <DashBoardLayout />
            </ProSidebarProvider>
         </div>

    )
}