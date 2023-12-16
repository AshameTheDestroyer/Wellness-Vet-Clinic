import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";

import DASHBOARD_PAGE_ANCHORS from "../../constants/DashboardPageAnchors";

export default function DashboardPageLayout(): React.ReactElement {
    return (
        <>
            <Header
                userIsAlwaysRegistered
                pageAnchors={DASHBOARD_PAGE_ANCHORS}
            />
            <Outlet />
        </>
    );
}