import React from "react";

import LazyImage from "../../utils/components/LazyImage/LazyImage";

import "./LandingPage.scss";

import cat_image from "../../assets/images/transparent/cat1.png";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationMethod } from "../RegistrationPage/RegistrationPage";
import logo from "../../assets/images/transparent/logo.png";

export default function LandingPage(): React.ReactElement {
    const Navigate = useNavigate();

    return (
        <main id="landing-page">
            <header>
                <img id="logo" src={logo} alt="The logo of the website." onClick={() => Navigate("/")} />
                <div>
                    <Link to={`/Registration?method=${RegistrationMethod.SignUp}`}>Sign up</Link>
                    <Link to={`/Registration?method=${RegistrationMethod.Login}`}>Login</Link>
                </div>
            </header>

            <main>
                <h1>Wellness Vet Clinic</h1>
                <p>Easiest way to have a treatment for your pets.</p>
                <button>Request an Appointment</button>
            </main>

            <figure>
                <LazyImage
                    originalImageSource={cat_image}
                    alternativeText="A cat standing still."
                />
            </figure>
        </main>
    );
}