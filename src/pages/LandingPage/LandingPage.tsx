import React from "react";
import { Link } from "react-router-dom";

import LazyImage from "../../utils/components/LazyImage/LazyImage";

import "./LandingPage.scss";

import cat_image from "../../assets/images/transparent/cat1.png";
import { AuthenticationMethod } from "../AuthenticationPage/AuthenticationPage";
import Logo from "../../layouts/components/Logo/Logo";

export default function LandingPage(): React.ReactElement {
    return (
        <main id="landing-page">
            <header>
                <Logo />
                <div>
                    <Link to={`/Authentication?method=${AuthenticationMethod.SignUp}`}>Sign up</Link>
                    <Link to={`/Authentication?method=${AuthenticationMethod.Login}`}>Login</Link>
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