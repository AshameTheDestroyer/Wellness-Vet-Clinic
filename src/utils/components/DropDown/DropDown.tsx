import React, { useEffect, useRef, useState } from "react";

import ComponentProps from "../../types/ComponentProps";

import "./DropDown.scss";

import DropDownIcon from "../../../assets/icons/DropDownIcon.tsx";

type DropDownProps = {
    text?: string;
    icon?: JSX.Element;
} & ComponentProps;

export default function DropDown(props: DropDownProps): React.ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropDownElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function CloseDropDown(e: MouseEvent): void {
            if (!isOpen) { return; }

            const clickedElement = (e.target as HTMLElement).closest(".drop-down");
            if (clickedElement == dropDownElementRef.current) { return; }

            setIsOpen(false);
            e.preventDefault();
        }

        document.addEventListener("click", CloseDropDown);

        return () => {
            document.removeEventListener("click", CloseDropDown);
        };
    }, [isOpen]);

    return (
        <div
            id={props.id}
            ref={dropDownElementRef}
            className={[
                "drop-down",
                props.className,
            ].toClassName()}

            data-is-open={isOpen}
            data-has-custom-icon={props.icon != null}
        >
            <button onClick={_e => setIsOpen(previousValue => !previousValue)}>
                {props.icon ?? <DropDownIcon />}
                {(props.text != null) && <p>{props.text}</p>}
            </button>

            <div className="drop-down-wrapper">
                <div className="drop-down-container" children={props.children} onClick={_e => setIsOpen(false)} />
            </div>
        </div>
    );
}