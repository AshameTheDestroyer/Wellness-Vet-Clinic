import React from "react";
import { Outlet } from "react-router-dom";

export default function DashboardPageLayout(): React.ReactElement {
    return (
        <>
            <p>HHH</p>
            <Outlet />
        </>
    );
}