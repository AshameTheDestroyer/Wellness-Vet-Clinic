import React from "react";

import PageHeading from "../../layouts/components/PageHeading/PageHeading";

import "./AboutPage.scss";

import dog_cat_image1 from "../../assets/images/transparent/dog_cat2.png";
import dog_cat_image2 from "../../assets/images/transparent/dog_cat3.png";

export default function AboutPage(): React.ReactElement {
    return (
        <main id="about-page">
            <PageHeading title="About us">
                <img src={dog_cat_image1} alt="A dog and a cat sitting." />
            </PageHeading>

            <main>
                <figure>
                    <img src={dog_cat_image2} alt="A dog and a cat looking forward." />
                </figure>
                <main>
                    <h2>About <strong>Wellness Veterinary Clinic</strong></h2>
                    <p>
                        Wellness Veterinary Clinic is an animal pet healthcare provider that was founded in October 2013 by a team of dedicated animal lovers and supported by the passionate animal care team. We have advanced throughout the years to deliver other products and services as well to cater to almost all the requirements and needs of our clients and their beloved pets.
                    </p>
                    <p>
                        At Wellness Veterinary Clinic we offer veterinary services all week long. Our working hours at our branch in Al Manara, Dubai is from 9am-9pm all days except Saturday (Timing 1pm-9pm). At our branch in Al Zahiyah, Abu Dhabi the timing is from 8am-10pm except Saturday (Timing 2pm-10pm). We also provide emergency services and have a dedicated team working 24/7 to ensure the safety of pets.
                    </p>
                </main>
            </main>
            <section id="service-displayer">
                <h2>Our Services</h2>
                <main> {
                    new Array(4)
                        .fill(null)
                        .map((_value, i) =>
                            <button className="service-card" key={i}>Service {i + 1}</button>
                        )
                } </main>
            </section>
        </main>
    );
}