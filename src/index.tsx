import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";

import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import MainPageLayout from "./layouts/MainPageLayout/MainPageLayout";

import "./utils/extensions/ToClassName";

import "./index.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import PAGE_ANCHORS from "./constants/PageAnchors";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

type MainStateProps = {
    isDarkThemed: boolean;

    ToggleDarkTheme: () => void;
};

export const MainContext: React.Context<MainStateProps> = createContext<MainStateProps>(null);

const darkThemeStyle: React.CSSProperties = {
    "--fore-colour": "#FFFFFF",
    "--background-colour": "#222222",
    "--fore-darker-colour": "#999999",
    "--background-darker-colour": "#111111",
} as React.CSSProperties;

const lightThemeStyle: React.CSSProperties = {
    "--fore-colour": "#222222",
    "--background-colour": "#FFFFFF",
    "--fore-darker-colour": "#111111",
    "--background-darker-colour": "#999999",
} as React.CSSProperties;

const
    ROOT: HTMLElement = document.querySelector(":root")!,
    ROOT_DIV_ELEMENT: HTMLElement | null = document.querySelector("#root");

ReactDOM.createRoot(ROOT_DIV_ELEMENT ?? document.body).render(<Index />);

function Index(): React.ReactElement {
    const [state, setState] = useState<MainStateProps>({
        isDarkThemed: false,

        ToggleDarkTheme,
    });

    let _header: HTMLElement;
    const getHeader = () => _header ?? (_header = document.getElementById("header"));

    useEffect(() => {
        document.body.classList.toggle("dark-themed");
        window.addEventListener("scroll", DetectStickingHeader);
    }, []);

    function ToggleDarkTheme(): void {
        state.isDarkThemed = !state.isDarkThemed;
        setState({ ...state });

        document.body.classList.toggle("light-themed");
        document.body.classList.toggle("dark-themed");

        const style: React.CSSProperties = state.isDarkThemed ? darkThemeStyle : lightThemeStyle;
        for (const [key, value] of Object.entries(style)) {
            ROOT.style.setProperty(key, value);
        }
    }

    function DetectStickingHeader(): void {
        const
            hasScrolledToTop: boolean = window.scrollY == 0,
            stickingHeaderClass = "sticking-header",
            header = getHeader();

        if (hasScrolledToTop) { header?.classList.remove(stickingHeaderClass); }
        else { header?.classList.add(stickingHeaderClass); }
    }

    return (
        <HashRouter basename="/">
            <MainContext.Provider value={state}>
                <Routes>
                    <Route path="/" element={<MainPageLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/About" element={<AboutPage />} />
                        <Route path="/Services" element={<ServicesPage />} />
                        <Route path="/ContactUs" element={<ContactUsPage />} />
                    </Route>

                    <Route path="/Landing" element={<LandingPage />} />
                    <Route path="/Authentication" element={<AuthenticationPage />} />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MainContext.Provider>
        </HashRouter>
    );
}