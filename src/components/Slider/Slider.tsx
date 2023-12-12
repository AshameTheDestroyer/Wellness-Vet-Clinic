import React from "react";

import ComponentProps from "../../utils/types/ComponentProps";

import "./Slider.scss";

type SliderProps = ComponentProps;

export default function Slider(props: ComponentProps): React.ReactElement {
    return (
        <div
            id={props.id}
            className={["slider", props.className].toClassName()}
            children={props.children}
        />
    );
}