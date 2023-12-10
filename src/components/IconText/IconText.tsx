import React from "react";

import "./IconText.scss";

type IconTextProps = {
    text: string;
    icon: JSX.Element;
};

export default function IconText(props: IconTextProps): React.ReactElement {
    return (
        <div className="icon-text">
            {props.icon}
            <p>{props.text}</p>
        </div>
    );
}