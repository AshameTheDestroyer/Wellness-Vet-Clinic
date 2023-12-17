import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../Logo/Logo";
import PAGE_ANCHORS from "../../../constants/PageAnchors";
import IconText from "../../../components/IconText/IconText";
import LocationIcon from "../../../assets/icons/LocationIcon";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import SocialMediaButtonDisplayer from "../../../components/SocialMediaButtonDisplayer/SocialMediaButtonDisplayer";

import "./Footer.scss";

import PhoneIcon from "../../../assets/icons/PhoneIcon";

export default function Footer(): React.ReactElement {
    const Navigate = useNavigate();

    return (
        <footer id="footer">
            <section>
                <Logo />
            </section>

            <section>
                <NavigationBar anchors={PAGE_ANCHORS} />
            </section>

            <section>
                <div className="icon-text-displayer">
                    <IconText icon={<LocationIcon />} text="Location" />
                    <IconText icon={<PhoneIcon />} text="94120256" />
                </div>

                <button onClick={_e => Navigate("/Booking")}>Book an Appointment</button>

                <SocialMediaButtonDisplayer />
            </section>

            <p id="copyright">Copyright © 2023</p>
        </footer>
    );
}