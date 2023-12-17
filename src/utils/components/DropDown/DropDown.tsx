import React, { useEffect, useState } from "react";

import ComponentProps from "../../types/ComponentProps";

import "./DropDown.scss";

import DropDownIcon from "../../../assets/icons/DropDownIcon";

type DropDownProps = ComponentProps;

export default function DropDown(props: DropDownProps): React.ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        function CloseDropDown(e: MouseEvent): void {
            if (!isOpen) { return; }
            if ((e.target as HTMLElement).closest(".drop-down") != null) { return; }

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
            className={[
                "drop-down",
                props.className,
            ].toClassName()}

            data-is-open={isOpen}
        >
            <button children={<DropDownIcon />} onClick={_e => setIsOpen(previousValue => !previousValue)} />
            <div className="drop-down-wrapper">
                <div className="drop-down-container" children={props.children} onClick={_e => setIsOpen(false)} />
            </div>
        </div>
    );
}