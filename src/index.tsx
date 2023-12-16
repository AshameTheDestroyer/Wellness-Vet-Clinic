import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, createContext, Fragment } from "react";

import HomePage from "./pages/HomePage/HomePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import MainPageLayout from "./layouts/MainPageLayout/MainPageLayout";
import AccessoriesPage from "./pages/AccessoriesPage/AccessoriesPage";
import PetDashboardPage from "./pages/PetDashboardPage/PetDashboardPage";
import DashboardPageLayout from "./layouts/DashboardPageLayout/DashboardPageLayout";

import "./utils/extensions/ToClassName";

import "./index.scss";

type MainStateProps = {
    loggedUser?: User;
    isDarkThemed: boolean;

    toggleDarkTheme: () => void;
    setLoggedUser: (user: User) => void;
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
    const [header, setHeader] = useState<HTMLElement>(null);
    const [state, setState] = useState<MainStateProps>({
        loggedUser: {
            id: 1,
            gender: "male",
            name: "Hashem Wannous",
            phone: "+963947233978",
            email: "hashemwnoos@gmail.com",
        },
        isDarkThemed: false,

        setLoggedUser: SetLoggedUser,
        toggleDarkTheme: ToggleDarkTheme,
    });

    useEffect(() => {
        document.body.classList.toggle("dark-themed");

        setHeader(document.getElementById("header"));
    }, []);

    useEffect(() => {
        function DetectStickingHeader(): void {
            const
                hasScrolledToTop: boolean = window.scrollY == 0,
                stickingHeaderClass = "sticking-header";

            if (hasScrolledToTop) { header?.classList.remove(stickingHeaderClass); }
            else { header?.classList.add(stickingHeaderClass); }
        }

        window.addEventListener("scroll", DetectStickingHeader);
    }, [header?.classList]);

    function ToggleDarkTheme(): void {
        state.isDarkThemed = !state.isDarkThemed;
        setState(previousValue => ({ ...previousValue }));

        document.body.classList.toggle("light-themed");
        document.body.classList.toggle("dark-themed");

        const style: React.CSSProperties = state.isDarkThemed ? darkThemeStyle : lightThemeStyle;
        for (const [key, value] of Object.entries(style)) {
            ROOT.style.setProperty(key, value);
        }
    }

    function SetLoggedUser(user: User): void {
        setState(previousValue => ({
            ...previousValue,
            loggedUser: user ? {
                ...previousValue.loggedUser,
                ...user,
            } : null,
        }));
    }

    return (
        <HashRouter basename="/">
            <MainContext.Provider value={state}>
                <Routes>
                    <Route path="/" element={<MainPageLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/Blog" element={<BlogPage />} />
                        <Route path="/About" element={<AboutPage />} />
                        <Route path="/ContactUs" element={<ContactUsPage />} />
                        <Route path="/Accessories" element={<AccessoriesPage />} />
                        <Route path="/Profile" element={<ProfilePage />} />
                        <Route path="/Dashboard">
                            <Route index element={<Navigate to="/ErrorPage" />} />
                            <Route path="/Dashboard" element={<DashboardPageLayout />}>
                                <Route path="/Dashboard/Pets" element={<PetDashboardPage />} />
                            </Route>
                        </Route>
                    </Route>


                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MainContext.Provider>
        </HashRouter>
    );
}