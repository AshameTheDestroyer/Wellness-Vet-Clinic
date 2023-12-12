import React from "react";

import EitherOrNeither from "../../types/EitherOrNeither";
import { ComponentEventProps, ChildlessComponentProps } from "../../types/ComponentProps";

import "./CustomInput.scss";

type CustomInputType = React.HTMLInputTypeAttribute;
type CustomInputPatternType = "text" | "password" | "email" | "search" | "telephone" | "url";

type CustomInputProps = ChildlessComponentProps & {
    name: string;
    value?: string;
    title?: string;
    isReadOnly?: boolean;
    isOptional?: boolean;
    placeholder?: string;
    minimumLength?: number;
    maximumLength?: number;
    isTransparent?: boolean;
    doesHidePlaceholder?: boolean;

    events?: ComponentEventProps<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>;
} & EitherOrNeither<
    EitherOrNeither<
        { type: Exclude<CustomInputType, "number" | CustomInputPatternType> },
        { type: "number"; minimumValue?: number; maximumValue?: number }
    >,
    { type: CustomInputPatternType; pattern?: string }
>;

export default function CustomInput(props: CustomInputProps): React.ReactElement {
    const id: string = `${props.name ?? props.id}-input-field`;

    return (
        <div className={[
            "custom-input-container",
            props.isTransparent && "transparent",
            (!props.doesHidePlaceholder) && "placeholder-always-shown",
        ].toClassName()}>
            <input
                id={id}
                className={[
                    "custom-input",
                    props.className,
                ].toClassName()}

                type={props.type}
                value={props.value}
                title={props.title}
                pattern={props.pattern}
                name={props.name}
                min={props.minimumValue}
                max={props.maximumValue}
                readOnly={props.isReadOnly}
                required={!props.isOptional}
                minLength={props.minimumLength}
                maxLength={props.maximumLength}
                placeholder={props.doesHidePlaceholder ? props.placeholder : " "}

                onBlur={e => {
                    if (props.type == "number" && e.currentTarget.value.length == 0) { e.currentTarget.value = 0..toString(); }

                    props.events?.onBlur?.(e);
                }}

                {...props.events}
            />

            <label htmlFor={id}>
                {props.placeholder}
                {(!props.isOptional) && <sup>*</sup>}
            </label>
        </div>
    );
}