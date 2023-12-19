import React from "react";
import { Link } from "react-router-dom";

import ComponentProps from "../../utils/types/ComponentProps";
import DropDown from "../../utils/components/DropDown/DropDown";

import "./CRUDDropDown.scss";

import IconText from "../IconText/IconText";
import TrashIcon from "../../assets/icons/TrashIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import PencilIcon from "../../assets/icons/PencilIcon";

type CRUDDropDown = ComponentProps;

export default function CRUDDropDown(props: ComponentProps): React.ReactElement {
    return (
        <DropDown
            id={props.id}
            className={[
                "crud-drop-down",
                props.className,
            ].toClassName()}
        >
            <Link
                to="#"

                children={<IconText icon={<SearchIcon />} text="Read" />}
            />
            <Link
                to="#"

                children={<IconText icon={<PencilIcon />} text="Edit" />}
            />
            <Link
                to="#"

                children={<IconText icon={<TrashIcon />} text="Delete" />}
            />
        </DropDown>
    );
}