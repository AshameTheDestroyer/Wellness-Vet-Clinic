import React from "react";
import { Link } from "react-router-dom";

import EitherOrNeither from "../../types/EitherOrNeither";
import ComponentProps, { ChildlessComponentProps, ComponentEventProps } from "../../types/ComponentProps";

import "./CustomButton.scss";

export type IconPlace = "left" | "right";
export type ButtonType = "button" | "submit" | "reset";

type CustomButtonProps = {
    link?: string;
    type?: ButtonType;
    role?: React.AriaRole;
    isEmphasized?: boolean;

    events?: ComponentEventProps<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>;
} & EitherOrNeither<{
    iconURL: string;
    iconPlace: IconPlace;
}, {
    isArrowed: boolean;
    iconPlace: IconPlace;
}> & EitherOrNeither<{
    isPressed?: boolean;
}, {
    isDisabled?: boolean;
}> & EitherOrNeither<{
    text?: string;
}, Pick<ComponentProps, "children">> & ChildlessComponentProps;

export default function CustomButton(props: CustomButtonProps): React.ReactElement {

    function OnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        if (props.isPressed) { return; }

        props.events?.onClick?.(e);

        if (props.link == null) { return; }

        const anchorElement: HTMLAnchorElement = e.currentTarget.querySelector("a");
        anchorElement.click();
    }

    return (
        <button
            id={props.id}
            className={[
                "custom-button",

                (props.isArrowed) && "custom-button-arrowed",
                (props.isPressed) && "custom-button-pressed",
                (props.isEmphasized) && "custom-button-emphasized",
                (props.iconURL != null) && "custom-button-iconified",

                props.className,
            ].toClassName()}

            disabled={props.isDisabled}
            role={props.role ?? "button"}
            type={props.type ?? "button"}
            data-icon-place={props.iconPlace}

            {...props.events}
            onClick={OnClick}

            style={{
                "--icon-url": (props.iconURL != null) ? `url("${props.iconURL}")` : undefined,
            } as React.CSSProperties}
        >
            {
                (props.link == null) ? (props.text ?? props.children) :
                    <Link to={props.link} tabIndex={-1}>{props.text ?? props.children}</Link>
            }
        </button>
    );
}