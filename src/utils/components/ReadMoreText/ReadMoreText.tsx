import React, { useState } from "react";

import { ChildlessComponentProps } from "../../types/ComponentProps";

import "./ReadMoreText.scss";

type ReadMoreTextProps = {
    text: string;
    lineCount: number;
    isUntogglable?: boolean;
} & ChildlessComponentProps;

export default function ReadMoreText(props: ReadMoreTextProps): React.ReactElement {
    const [isFolded, setIsFolded] = useState<boolean>(false);

    if (props.lineCount < 1) {
        throw new Error("Line count should be at least 1 or more.");
    }

    return (
        <p
            id={props.id}
            className={[
                "read-more-text",
                props.className,
            ].toClassName()}

            data-is-folded={isFolded}
            data-is-untogglable={props.isUntogglable}
            title={(props.isUntogglable) ? "" : ((isFolded) ? "Read less" : "Read more")}

            style={{ WebkitLineClamp: props.lineCount }}

            onClick={_e => (!props.isUntogglable) && setIsFolded(previousValue => !previousValue)}

            children={props.text}
        />
    );
}