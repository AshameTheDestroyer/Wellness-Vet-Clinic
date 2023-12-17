import React from "react";

import ComponentProps from "../../../utils/types/ComponentProps";

import "./PageHeading.scss";

type PageHeadingProps = {
    title?: string;
} & ComponentProps;

export default function PageHeading(props: PageHeadingProps): React.ReactElement {
    return (
        <header
            id={props.id}
            className={[
                "page-heading",
                props.className,
            ].toClassName()}
        >
            {(props.title != null) && <h1>{props.title}</h1>}
            <section>{props.children}</section>
        </header>
    );
}