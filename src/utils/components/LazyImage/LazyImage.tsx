import React, { useRef, useEffect, useState } from "react";

import { ChildlessComponentProps, ComponentEventProps } from "../../types/ComponentProps";

import "./LazyImage.scss";
import Coordinates from "../../types/Coordinates";
import { createPortal } from "react-dom";

type LazyImageProps = {
    alternativeText: string;
    originalImageSource: string;
    pixelatedImageSource?: string;

    events?: ComponentEventProps<HTMLImageElement, React.HTMLAttributes<HTMLImageElement>>;
} & ChildlessComponentProps;

export default function LazyImage(props: LazyImageProps): React.ReactElement {
    const imageRef = useRef<HTMLImageElement>(null);
    const blurredImageRef = useRef<HTMLImageElement>(null);
    const [rect, setRect] = useState<DOMRect>();

    useEffect(() => {
        imageRef.current?.addEventListener("load", OnImageLoad);
        setRect(imageRef.current?.getBoundingClientRect());
    }, []);

    function OnImageLoad(_e: Event): void {
        imageRef.current?.classList.remove("lazy-image-hidden");
        blurredImageRef.current?.classList.add("lazy-image-hidden");
    }

    return (
        <>
            <img
                id={props.id}
                className={[
                    "lazy-image",
                    "lazy-image-hidden",
                    props.className,
                ].toClassName()}
                ref={imageRef}

                loading="lazy"
                alt={props.alternativeText}
                src={props.originalImageSource}

                {...props.events}
            />
            {
                createPortal(
                    <img
                        className="lazy-image pixelated-lazy-image"
                        ref={blurredImageRef}

                        aria-hidden={true}
                        src={props.pixelatedImageSource}

                        style={{
                            top: `${rect?.top ?? 0}px`,
                            left: `${rect?.left ?? 0}px`,
                            right: `${rect?.right ?? 0}px`,
                            bottom: `${rect?.bottom ?? 0}px`,
                            width: `${rect?.width ?? 0}px`,
                            height: `${rect?.height ?? 0}px`,
                        }}
                    />
                    , document.body)
            }
        </>
    );
}