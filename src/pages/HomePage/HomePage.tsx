import React from "react";

import "./HomePage.scss";

import dog_image from "../../assets/images/transparent/dog1.png";
import SocialMediaButtonDisplayer from "../../components/SocialMediaButtonDisplayer/SocialMediaButtonDisplayer";

export default function HomePage(): React.ReactElement {
    return (
        <main id="home-page">
            <section id="hero-section">
                <div>
                    <h1>Wellness Veterinary Clinic</h1>
                    <button>Book an Appointment</button>
                    <SocialMediaButtonDisplayer />
                </div>
                <figure>
                    <img src={dog_image} alt="A dog smiling." />
                </figure>
            </section>
        </main>
    );
}