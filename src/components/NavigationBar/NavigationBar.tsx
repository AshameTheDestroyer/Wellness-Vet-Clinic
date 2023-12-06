import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavigationBar.scss";

export type AnchorLiteral = string | { name: string; url: string };

type NavbarProps = {
    anchors: Array<AnchorLiteral>;
    isOpen: boolean;

    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavigationBar(props: NavbarProps): React.ReactElement {
    const location = useLocation();

    return (
        <nav className="navigation-bar" data-opened={props.isOpen}>
            <ul>
                {props.anchors.map((anchor, i) =>
                    <li
                        key={i}

                        data-navigated-to={
                            typeof anchor == "string" ?
                                location.pathname.slice(1) == anchor :
                                location.pathname.slice(1) == anchor.url
                        }
                    > {
                            typeof anchor == "string" ? (
                                <Link to={`./${anchor}`}>{anchor}</Link>
                            ) : (
                                <Link to={`./${anchor.url}`}>{anchor.name}</Link>
                            )
                        } </li>
                )}
            </ul>
        </nav>
    );
}
