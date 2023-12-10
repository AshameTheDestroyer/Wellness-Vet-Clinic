import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavigationBar.scss";

import Role from "../../enums/Role";

type NavbarProps = {
    anchors: Array<PageAnchor>;
};

export default function NavigationBar(props: NavbarProps): React.ReactElement {
    return (
        <nav className="navigation-bar">
            <ul>
                {props.anchors.map((anchor, i) =>
                    <PageAnchorElement key={i} anchor={anchor} />
                )}
            </ul>
        </nav>
    );
}

type PageAnchorElementProps = {
    anchor: PageAnchor;
    nestingIndex?: number;
}

function FormatPageAnchor(anchor: PageAnchor): Exclude<PageAnchor, string> {
    if (typeof anchor == "string") {
        return {
            name: anchor,
            role: Role.Customer,
            url: anchor.replace(/ /g, ""),
        };
    }

    return {
        ...anchor,
        role: anchor.role ?? Role.Customer,
        url: (anchor.url ?? anchor.name).replace(/ /g, ""),
    };
}

function PageAnchorElement(props: PageAnchorElementProps): React.ReactElement {
    const location = useLocation();
    const anchor: PageAnchor = FormatPageAnchor(props.anchor);

    const
        hasSameUrl: boolean = location.pathname.slice(1) == anchor.url,
        isSubUrlOfUrl: boolean = location.pathname.slice(1).startsWith(anchor.url),
        isIndexUrl: boolean = anchor.url.split("/").at(-1) == "",
        isNavigatedTo: boolean = hasSameUrl || isSubUrlOfUrl && !isIndexUrl;

    return (
        <li data-navigated-to={isNavigatedTo}>
            <Link to={`/${anchor.url}`}>{anchor.name}</Link>
        </li>
    );
}