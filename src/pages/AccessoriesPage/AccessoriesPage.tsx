import React from "react";

import TabContainer from "../../components/TabContainer/TabContainer";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";

import "./AccessoriesPage.scss";

import dog_image1 from "../../assets/images/wallpapers/dog1.png";
import dog_image2 from "../../assets/images/wallpapers/dog2.png";
import dog_image3 from "../../assets/images/wallpapers/dog3.png";
import shampoo_image from "../../assets/images/wallpapers/shampoo.png";
import pet_food_image from "../../assets/images/wallpapers/pet_food.png";
import two_cats_image from "../../assets/images/transparent/two_cats.png";
import pet_acquirements_image from "../../assets/images/wallpapers/pet_acquirements.png";

const DOG_IMAGES = [dog_image1, dog_image2, dog_image3];

export default function AccessoriesPage(): React.ReactElement {
    return (
        <main id="accessories-page">
            <PageHeading title="Accessories">
                <img src={two_cats_image} alt="Two cats with one looking forward and another elsewhere." />
            </PageHeading>

            <main>
                <TabContainer
                    tabs={new Array(4).fill(null).map((_value, i) => ({
                        title: "Category " + (4 - i),
                        element: (
                            <section key={i}>
                                <section>
                                    <h3>Our Offers</h3>
                                    <figure>
                                        <img src={pet_acquirements_image} alt="A bunch of pets acquirements on the floor." data-two-rows />
                                        <img src={pet_food_image} alt="Pets food containers." />
                                        <img src={shampoo_image} alt="Shampoos for dogs." />
                                    </figure>
                                </section>
                                <main>
                                    <h3>Pet Supplies Goods</h3>
                                    <section> {
                                        new Array(DOG_IMAGES.length ** 2)
                                            .fill(null)
                                            .map((_value, i) =>
                                                <div key={i} className="card">
                                                    <img src={DOG_IMAGES[i % DOG_IMAGES.length]} alt="A dog sitting." />
                                                    <div>
                                                        <h4>Name</h4>
                                                        <p>Description</p>
                                                    </div>
                                                </div>
                                            )
                                    } </section>
                                </main>
                            </section>
                        )
                    }))}
                />
            </main>
        </main>
    );
}