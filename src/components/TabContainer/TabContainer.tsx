import React, { useState } from "react";

import { ChildlessComponentProps } from "../../utils/types/ComponentProps";

import "./TabContainer.scss";

export type Tab = {
    title: string;
    element: JSX.Element;
};

type TabContainerProps = {
    tabs: Array<Tab>;
} & ChildlessComponentProps;

export default function TabContainer(props: TabContainerProps): React.ReactElement {
    const [selectedTab, setSelectedTab] = useState<Tab>(props.tabs[0]);

    return (
        <section
            id={props.id}
            className={[
                "tab-container",
                props.className,
            ].toClassName()}
        >
            <div className="button-displayer"> {
                props.tabs.map((tab, i) =>
                    <button key={i} onClick={_e => setSelectedTab(tab)}>{tab.title}</button>
                )
            } </div>
            {selectedTab.element}
        </section>
    );
}