import React from "react";
import { Link } from "react-router-dom";

import PageHeading from "../../layouts/components/PageHeading/PageHeading";
import ComponentProps from "../../utils/types/ComponentProps";

import "./ContactUsPage.scss";

import MailIcon from "../../assets/icons/MailIcon";
import UserIcon from "../../assets/icons/UserIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import rabbit_image from "../../assets/images/wallpapers/rabbit1.png";

import qr_code_tiktok from "../../assets/images/wallpapers/qr_code_tiktok.jpeg";
import qr_code_facebook from "../../assets/images/wallpapers/qr_code_facebook.jpeg";
import qr_code_instagram from "../../assets/images/wallpapers/qr_code_instagram.jpeg";
import location_address_image from "../../assets/images/wallpapers/location_address.png";

export default function ContactUsPage(): React.ReactElement {
    return (
        <main id="contact-us-page">
            <PageHeading title="Contact Information">
                <img src={rabbit_image} alt="A rabbit withing a child's hands." />
            </PageHeading>

            <main>
                <CardIcon
                    title="Phone Number"
                    text="+97156665784"
                    icon={<PhoneIcon />}
                />
                <CardIcon
                    title="Email"
                    text="ibrahim@wellnessvetclinic.ae"
                    icon={<MailIcon />}
                />
                <CardIcon
                    id="social-media-card-icon"
                    title="Social Media"
                    icon={<UserIcon />}
                >
                    <QRCodeLink imageSource={qr_code_facebook} title="Facebook" />
                    <QRCodeLink imageSource={qr_code_instagram} title="Instagram" />
                    <QRCodeLink imageSource={qr_code_tiktok} title="Tiktok" />
                </CardIcon>
                <CardIcon
                    id="google-map-card-icon"
                    title="Find us on Google Maps"
                    text="Ajman - Alrawda 1 - Altalla Street"
                >
                    <img src={location_address_image} alt="The location address of the clinic." />
                </CardIcon>
            </main>
        </main>
    );
}

type CardIconProps = {
    title: string;
    text?: string;
    icon?: JSX.Element;
} & ComponentProps;

function CardIcon(props: CardIconProps): React.ReactElement {
    return (
        <div
            id={props.id}
            className={[
                "card-icon",
                props.className,
            ].toClassName()}
        >
            <main>
                {(props.icon != null) && <figure>{props.icon}</figure>}
                <div>
                    <h2>{props.title}</h2>
                    {(props.text != null) && <p>{props.text}</p>}
                </div>
            </main>
            {(props.children != null) && <section children={props.children} />}
        </div>
    );
}

type QRCodeLinkProps = {
    title: string;
    imageSource: string;
};

function QRCodeLink(props: QRCodeLinkProps): React.ReactElement {
    return (
        <div className="qr-code-link">
            <figure>
                <img src={props.imageSource} alt={`${props.title} QR Code.`} />
            </figure>
            <button>
                <Link to="#" tabIndex={0}>{props.title}</Link>
            </button>
        </div>
    );
}