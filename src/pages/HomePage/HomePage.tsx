import React from "react";
import { useNavigate } from "react-router-dom";

import SocialMediaButtonDisplayer from "../../components/SocialMediaButtonDisplayer/SocialMediaButtonDisplayer";

import "./HomePage.scss";

import dog_image from "../../assets/images/transparent/dog1.png";

export default function HomePage(): React.ReactElement {
    const Navigate = useNavigate();

    return (
        <main id="home-page">
            <section id="hero-section">
                <div>
                    <h1>Wellness Veterinary Clinic</h1>
                    <button onClick={_e => Navigate("/Booking")}>Book an Appointment</button>
                    <SocialMediaButtonDisplayer />
                </div>
                <figure>
                    <img src={dog_image} alt="A dog smiling." />
                </figure>
            </section>
        </main>
    );
}