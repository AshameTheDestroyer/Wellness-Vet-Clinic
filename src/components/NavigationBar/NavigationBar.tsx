import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavigationBar.scss";

import CrossIcon from "../../assets/icons/CrossIcon";
import HamburgerButtonIcon from "../../assets/icons/HamburgerButtonIcon";
import Role from "../../enums/Role";

type NavbarProps = {
    anchors: Array<PageAnchor>;
    isOpen: boolean;

    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavigationBar(props: NavbarProps): React.ReactElement {
    return (
        <nav className="navigation-bar" data-opened={props.isOpen}>
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
            subAnchors: [],
            role: Role.Customer,
            url: anchor.replace(/ /g, ""),
        };
    }

    return {
        ...anchor,
        role: anchor.role ?? Role.Customer,
        subAnchors: (anchor.subAnchors) ?? [],
        url: (anchor.url ?? anchor.name).replace(/ /g, ""),
    };
}

function PageAnchorElement(props: PageAnchorElementProps): React.ReactElement {
    const location = useLocation();
    const anchor: PageAnchor = FormatPageAnchor(props.anchor);
    const nestingIndex: number = props.nestingIndex ?? 0;

    const
        hasSubAnchors: boolean = anchor.subAnchors.length > 0,
        hasSameUrl: boolean = location.pathname.slice(1) == anchor.url,
        isSubUrlOfUrl: boolean = location.pathname.slice(1).startsWith(anchor.url),
        isIndexUrl: boolean = anchor.url.split("/").at(-1) == "",
        isNavigatedTo: boolean = hasSameUrl || isSubUrlOfUrl && !isIndexUrl;

    const [isFolded, setIsFolded] = useState<boolean>((hasSubAnchors) ? false : null);

    return (
        <li data-navigated-to={isNavigatedTo} data-is-folded={isFolded}>
            <Link
                to={`/${anchor.url}`}
                data-nesting-index={props.nestingIndex}

                style={{
                    "--nesting-index": props.nestingIndex,
                } as React.CSSProperties}

                onClick={e => {
                    if (!hasSubAnchors) { return; }

                    setIsFolded(previousValue => !previousValue);
                    e.preventDefault();
                }}
            >
                {anchor.name}
                {(hasSubAnchors) && (
                    (isFolded) ? <CrossIcon /> : <HamburgerButtonIcon />
                )}
            </Link>
            {
                (hasSubAnchors) &&
                <ul> {
                    anchor.subAnchors.map((subAnchor, i) => {
                        const subAnchor_ = FormatPageAnchor(subAnchor);
                        return (
                            <PageAnchorElement
                                key={i}

                                nestingIndex={nestingIndex + 1}
                                anchor={{
                                    ...subAnchor_,
                                    url: `${anchor.url}/${subAnchor_.url}`,
                                }}
                            />
                        );
                    })
                } </ul>
            }
        </li>
    );
}