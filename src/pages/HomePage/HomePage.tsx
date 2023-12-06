import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./HomePage.scss";

import BubbleImage from "../../assets/images/bubbles/BubbleImage";
import dog_cat_image from "../../assets/images/transparent/dog_cat.png";

export default function HomePage(): React.ReactElement {
    const Navigate = useNavigate();

    useEffect(() => {
        // TODO: Add an API request to see if the user is signed in or not.
        // eslint-disable-next-line no-constant-condition
        if (true) { Navigate("/Landing"); }
    }, [Navigate]);

    return (
        <main id="home-page">
            <main>
                <main>
                    <h1>
                        Keeping your pet on a stress-free path to
                        <strong>Wellness</strong>
                    </h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus alias excepturi, atque nemo quod ea. Aut, tenetur. Quas, aliquam, cumque, suscipit ullam assumenda et exercitationem nam corporis deserunt quasi eum!</p>
                    <button>Request an Appointment</button>
                </main>
                <figure>
                    <BubbleImage />
                    <img src={dog_cat_image} alt="A dog and a cat sitting." />
                </figure>
            </main>
        </main>
    );
}