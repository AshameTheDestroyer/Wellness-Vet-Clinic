import React from "react";
import { useNavigate } from "react-router-dom";

import "./Logo.scss";

import logo from "../../../assets/images/transparent/logo.png";

export default function Logo(): React.ReactElement {
    const Navigate = useNavigate();

    {/*// TODO: Placeholder for the actual logo.*/ }
    return (
        <img id="logo" src={logo} alt="The logo of the website." onClick={() => Navigate("/")} />
    );
}