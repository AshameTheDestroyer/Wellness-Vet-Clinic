import React from "react";

import "./SocialMediaButtonDisplayer.scss";

import WhatsappIcon from "../../assets/icons/WhatsappIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";

export default function SocialMediaButtonDisplayer(): React.ReactElement {
    return (
        <div className="button-displayer social-media-button-displayer">
            <button><FacebookIcon /></button>
            <button><InstagramIcon /></button>
            <button><WhatsappIcon /></button>
        </div>
    );
}