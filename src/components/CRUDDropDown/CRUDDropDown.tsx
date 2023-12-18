import React from "react";

import DropDown from "../../utils/components/DropDown/DropDown";

import "./CRUDDropDown.scss";
import ComponentProps from "../../utils/types/ComponentProps";
import { Link } from "react-router-dom";
import IconText from "../IconText/IconText";
import PencilIcon from "../../assets/icons/PencilIcon";
import CrossIcon from "../../assets/icons/CrossIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import TrashIcon from "../../assets/icons/TrashIcon";

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