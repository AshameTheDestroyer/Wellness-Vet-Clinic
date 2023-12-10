import React from "react";

import NavigationBar from "../../../components/NavigationBar/NavigationBar.tsx";

import "./Header.scss";

import Logo from "../Logo/Logo.tsx";
import PAGE_ANCHORS from "../../../constants/PageAnchors.tsx";

export default function Header(): React.ReactElement {
    return (
        <header id="header" className="sticking-header">
            <Logo />
            <NavigationBar anchors={PAGE_ANCHORS} />
            <button>Sign in</button>
        </header>
    );
}