import React from "react";
import { useNavigate } from "react-router-dom";

import "./Logo.scss";

import logo_image from "../../../assets/images/transparent/logo.png";
// import logo_image_resized from "../../../assets/images/transparent.resized/logo.png";
// import LazyImage from "../../../utils/components/LazyImage/LazyImage";

export default function Logo(): React.ReactElement {
    const Navigate = useNavigate();

    return (
        <img id="logo" src={logo_image} alt="The logo of the website." onClick={() => Navigate("/")} />

        // <LazyImage
        //     id="logo"
        //     originalImageSource={logo_image}
        //     pixelatedImageSource={logo_image_resized}
        //     alternativeText="The logo of the website."

        //     events={{ onClick: () => Navigate("/") }}
        // />
    );
}