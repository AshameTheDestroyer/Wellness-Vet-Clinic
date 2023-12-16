import React from "react";

import ComponentProps from "../../utils/types/ComponentProps";

import "./Slider.scss";

type SliderProps = {
    direction?: "horizontal" | "vertical";
} & ComponentProps;

export default function Slider(props: SliderProps): React.ReactElement {
    return (
        <div
            id={props.id}
            className={["slider", props.className].toClassName()}

            data-direction={props.direction ?? "horizontal"}

            children={props.children}
        />
    );
}