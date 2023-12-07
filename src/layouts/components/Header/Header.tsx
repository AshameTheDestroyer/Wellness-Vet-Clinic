import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../../index.tsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.tsx";

import "./Header.scss";

import SunIcon from "../../../assets/icons/SunIcon.tsx";
import MoonIcon from "../../../assets/icons/MoonIcon.tsx";
import CrossIcon from "../../../assets/icons/CrossIcon.tsx";
import HamburgerButtonIcon from "../../../assets/icons/HamburgerButtonIcon.tsx";

import { AuthenticationMethod } from "../../../pages/AuthenticationPage/AuthenticationPage.tsx";
import Logo from "../Logo/Logo.tsx";
import PAGE_ANCHORS from "../../../constants/PageAnchors.tsx";

export default function Header(): React.ReactElement {
    const [isNavigationBarOpen, setIsNavigationBarOpen] = useState<boolean>(false);
    const MainState = useContext(MainContext);
    const location = useLocation();

    useEffect(() => {
        setIsNavigationBarOpen(false);
    }, [location]);

    return (
        <header id="header">
            <HeaderLeftSide />

            <NavigationBar
                anchors={PAGE_ANCHORS}
                isOpen={isNavigationBarOpen}

                setIsOpen={setIsNavigationBarOpen}
            />

            <div id="toggling-button-displayer" className="button-displayer">
                <button
                    id="theme-toggling-button"

                    onClick={() => MainState.ToggleDarkTheme()}
                >
                    {MainState.isDarkThemed ? <SunIcon /> : <MoonIcon />}
                </button>

                <button
                    id="navigation-bar-button"

                    onClick={() => setIsNavigationBarOpen(previousValue => !previousValue)}
                >
                    {isNavigationBarOpen ? <CrossIcon /> : <HamburgerButtonIcon />}
                </button>
            </div>
        </header>
    );
}

function HeaderLeftSide(): React.ReactElement {
    return (
        <figure id="header-left-side">
            <Logo />
            <p>Wellness Vet Clinic</p>
            <button>
                <Link to={`/Authentication?method=${AuthenticationMethod.Login}`}>Login</Link>
            </button>
        </figure>
    );
}
