import React from "react";

import Logo from "../Logo/Logo";
import PAGE_ANCHORS from "../../../constants/PageAnchors";
import IconText from "../../../components/IconText/IconText";
import LocationIcon from "../../../assets/icons/LocationIcon";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";

import "./Footer.scss";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import SocialMediaButtonDisplayer from "../../../components/SocialMediaButtonDisplayer/SocialMediaButtonDisplayer";

export default function Footer(): React.ReactElement {
    return (
        <footer id="footer">
            <section>
                <Logo />
                <p>Copyright © 2023</p>
            </section>

            <section>
                <NavigationBar anchors={PAGE_ANCHORS} />
            </section>

            <section>
                <div className="icon-text-displayer">
                    <IconText icon={<LocationIcon />} text="Location" />
                    <IconText icon={<PhoneIcon />} text="94120256" />
                </div>

                <button>Book an Appointment</button>

                <SocialMediaButtonDisplayer />
            </section>
        </footer>
    );
}