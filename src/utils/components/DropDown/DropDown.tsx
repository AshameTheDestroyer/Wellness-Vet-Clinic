import React, { useState } from "react";

import ComponentProps from "../../types/ComponentProps";

import "./DropDown.scss";

import CrossIcon from "../../../assets/icons/CrossIcon";

type DropDownProps = ComponentProps;

export default function DropDown(props: DropDownProps): React.ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            id={props.id}
            className={[
                "drop-down",
                props.className,
            ].toClassName()}

            data-is-open={isOpen}
        >
            <button children={<CrossIcon />} onClick={_e => setIsOpen(previousValue => !previousValue)} />
            <div className="drop-down-wrapper">
                <div className="drop-down-container" children={props.children} onClick={_e => setIsOpen(false)} />
            </div>
        </div>
    );
}