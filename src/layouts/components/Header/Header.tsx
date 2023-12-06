import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { MainContext } from "../../../index.tsx";
import NavigationBar, { AnchorLiteral } from "../../../components/NavigationBar/NavigationBar.tsx";

import "./Header.scss";

import SunIcon from "../../../assets/icons/SunIcon.tsx";
import MoonIcon from "../../../assets/icons/MoonIcon.tsx";
import CrossIcon from "../../../assets/icons/CrossIcon.tsx";
import HamburgerButtonIcon from "../../../assets/icons/HamburgerButtonIcon.tsx";

import logo from "../../../assets/images/transparent/logo.png";
import { RegistrationMethod } from "../../../pages/RegistrationPage/RegistrationPage.tsx";

export default function Header(): React.ReactElement {
    const [isNavigationBarOpen, setIsNavigationBarOpen] = useState<boolean>(false);
    const MainState = useContext(MainContext);
    const location = useLocation();

    const anchors: Array<AnchorLiteral> = [
        { name: "Home", url: "" },
        "About",
        "Services",
        "Resources",
        { name: "Contact Us", url: "ContactUs" },
    ];

    useEffect(() => {
        setIsNavigationBarOpen(false);
    }, [location])

    return (
        <header id="header">
            <HeaderLeftSide />

            <NavigationBar
                anchors={anchors}
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
    const Navigate = useNavigate();
    const location = useLocation();

    return (
        <figure id="header-left-side">
            {/*// TODO: Placeholder for the actual logo.*/}
            <img src={logo} alt="The logo of the website." onClick={() => Navigate("/")} />
            <p>Wellness Vet Clinic</p>

            {
                location.pathname.slice(1) != "Signing" &&
                <div id="signing-button-displayer" className="button-displayer">
                    <button>
                        <Link to={`./Registration?method=${RegistrationMethod.SignUp}`}>Sign up</Link>
                    </button>
                    <button>
                        <Link to={`./Registration?method=${RegistrationMethod.Login}`}>Login</Link>
                    </button>
                </div>
            }
        </figure>
    );
}
