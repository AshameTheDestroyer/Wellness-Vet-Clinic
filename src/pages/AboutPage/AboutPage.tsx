import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import Slider from "../../components/Slider/Slider";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";

import "./AboutPage.scss";

import dog_cat_image1 from "../../assets/images/transparent/dog_cat2.png";
import dog_cat_image2 from "../../assets/images/transparent/dog_cat3.png";
import dog_image from "../../assets/images/wallpapers/dog3.png";

export type Service = {
    id: number;
    title: string;
    description: string;
    imageSource: string;
    imageAlternative: string;
};

export const TEMPORARY_SERVICE_DATA: Array<Service> = new Array(44)
    .fill(null)
    .map((_value, i) => ({
        id: i + 1,
        title: `Service ${i + 1}`,
        description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est earum molestias consequatur, repudiandae sequi, illum labore vero quo nemo, unde adipisci. Ipsa unde eveniet ex eaque neque consequuntur vero repudiandae?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est earum molestias consequatur, repudiandae sequi, illum labore vero quo nemo, unde adipisci.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa unde eveniet ex eaque neque consequuntur vero repudiandae?
        `,
        imageSource: dog_image,
        imageAlternative: "A dog sitting.",
    }));

export default function AboutPage(): React.ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();

    const
        selectedServiceId: string = searchParams.get("service-id"),
        selectedService: Service = TEMPORARY_SERVICE_DATA.find(datum => datum.id.toString() == selectedServiceId);

    return (
        <main id="about-page">
            <PageHeading title={selectedService?.title ?? `About us`}>
                <img src={dog_cat_image1} alt="A dog and a cat sitting." />
            </PageHeading>

            {(() => {
                if (selectedServiceId == null) { return (<AboutPageDefaultContent />); }
                if (selectedService != null) {
                    return (<ServiceDisplayer key={selectedService?.id} {...selectedService} />);
                }

                return (
                    <main id="service-displayer">
                        <h2>Service Not Found</h2>
                    </main>
                );
            })()}

            <ServiceButtonDisplayer selectedServiceId={Number(selectedServiceId)} />
        </main>
    );
}

function AboutPageDefaultContent(): React.ReactElement {
    return (
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
    );
}

type ServiceButtonDisplayerProps = {
    selectedServiceId: number;
};

function ServiceButtonDisplayer(props: ServiceButtonDisplayerProps): React.ReactElement {
    return (
        <section id="service-button-displayer">
            <h2>Our Services</h2>
            <Slider> {
                TEMPORARY_SERVICE_DATA
                    .map((service, i) =>
                        <button
                            key={i}

                            data-is-selected={props.selectedServiceId == service.id}
                            tabIndex={-1}
                        >
                            <Link to={`./?service-id=${service.id}`}>{service.title}</Link>
                        </button>
                    )
            } </Slider>
        </section>
    );
}

type ServiceDisplayerProps = Service;

function ServiceDisplayer(props: ServiceDisplayerProps): React.ReactElement {
    return (
        <main id="service-displayer">
            <p>{props.description}</p>
            <img src={props.imageSource} alt={props.imageAlternative} />
        </main>
    );
}