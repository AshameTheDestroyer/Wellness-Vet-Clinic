import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavigationBar.scss";

type NavbarProps = {
    anchors: Array<PageAnchor>;
    isOpen: boolean;

    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavigationBar(props: NavbarProps): React.ReactElement {
    const location = useLocation();

    return (
        <nav className="navigation-bar" data-opened={props.isOpen}>
            <ul>
                {props.anchors.map((anchor, i) =>
                    <PageAnchorElement anchor={anchor} />
                )}
            </ul>
        </nav>
    );
}

type PageAnchorElementProps = {
    anchor: PageAnchor;
    nestingIndex?: number;
}

function PageAnchorElement(props: PageAnchorElementProps): React.ReactElement {
    const anchor: PageAnchor = {
        name: (typeof props.anchor == "string") ? props.anchor : props.anchor.name,
        url: RemoveSpaces(
            (typeof props.anchor == "string") ?
                props.anchor : (props.anchor.url ?? props.anchor.name)
        ),
        subAnchors: ((typeof props.anchor == "string") ? undefined : (props.anchor.subAnchors)) ?? [],
    };

    const nestingIndex: number = props.nestingIndex ?? 0;

    function RemoveSpaces(text: string): string {
        return text.replace(/ /g, "");
    }

    return (
        <li data-navigated-to={location.pathname.slice(1) == anchor.url}>
            <Link
                to={`/${anchor.url}`}
                data-nesting-index={props.nestingIndex}
            >
                {anchor.name}
            </Link>

            {
                (anchor.subAnchors.length > 0) &&
                <ul> {
                    anchor.subAnchors.map((subAnchor, i) =>
                        <PageAnchorElement key={i} anchor={subAnchor} nestingIndex={nestingIndex + 1} />
                    )
                } </ul>
            }
        </li>
    );
}