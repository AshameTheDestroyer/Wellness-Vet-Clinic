import React, { useState } from "react";

import { ChildlessComponentProps } from "../../utils/types/ComponentProps";

import "./TabContainer.scss";
import Slider from "../Slider/Slider";

export type Tab = {
    title: string;
    element: JSX.Element;
};

type TabContainerProps = {
    tabs: Array<Tab>;
} & ChildlessComponentProps;

export default function TabContainer(props: TabContainerProps): React.ReactElement {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    return (
        <section
            id={props.id}
            className={[
                "tab-container",
                props.className,
            ].toClassName()}
        >
            <Slider> {
                props.tabs.map((tab, i) =>
                    <button
                        key={i}

                        data-is-selected={selectedTabIndex == i}

                        onClick={_e => setSelectedTabIndex(i)}
                    >
                        {tab.title}
                    </button>
                )
            } </Slider>

            {props.tabs[selectedTabIndex].element}
        </section>
    );
}