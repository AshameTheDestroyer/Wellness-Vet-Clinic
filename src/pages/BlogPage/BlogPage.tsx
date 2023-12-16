import React, { useState } from "react";

import Slider from "../../components/Slider/Slider";
import CustomInput from "../../utils/components/CustomInput/CustomInput";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";

import "./BlogPage.scss";

import dog_image1 from "../../assets/images/transparent/dog4.png";
import dog_image2 from "../../assets/images/wallpapers/dog4.png";
import ReadMoreText from "../../utils/components/ReadMoreText/ReadMoreText";

const TEMPORARY_DATA: Array<{
    id: number;
    text: string;
    title: string;
    imageSource: string;
    imageAlternative: string;
}> = new Array(1000)
    .fill(null)
    .map((_value, i) => ({
        id: i,
        title: `title ${i + 1}`,
        imageSource: dog_image2,
        imageAlternative: "A dog looking outside of a car's window.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta provident veritatis suscipit eligendi magni, deserunt dolore earum expedita itaque, fugit amet corporis? Suscipit qui et dolores? Ad aperiam doloremque odit!",
    }));

const
    BLOGS_PER_PAGE: number = 6,
    PAGE_COUNT: number = Math.ceil(TEMPORARY_DATA.length / BLOGS_PER_PAGE);

export default function BlogPage(): React.ReactElement {
    const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

    return (
        <main id="blog-page">
            <PageHeading title="Blog">
                <img src={dog_image1} alt="A dog wearing a graduate hat and glasses." />
            </PageHeading>

            <main>
                <SearchForm />
                <BlogDisplayer selectedPageIndex={selectedPageIndex} />
                <PaginationButtonDisplayer
                    selectedPageIndex={selectedPageIndex}

                    setSelectedPageIndex={setSelectedPageIndex}
                />
            </main>
        </main>
    );
}

function SearchForm(): React.ReactElement {
    return (
        <form method="GET" onSubmit={e => e.preventDefault()}>
            <CustomInput
                type="text"
                name="search"
                placeholder="Type here..."
                isOptional
                doesHidePlaceholder
            />
            <button type="submit">Search</button>
        </form>
    );
}

type BlogDisplayerProps = {
    selectedPageIndex: number;
};

function BlogDisplayer(props: BlogDisplayerProps): React.ReactElement {
    return (
        <section id="blog-displayer"> {
            TEMPORARY_DATA.slice(
                props.selectedPageIndex * BLOGS_PER_PAGE,
                (props.selectedPageIndex + 1) * BLOGS_PER_PAGE
            ).map((datum, i) =>
                <div key={datum.id} className="blog-card">
                    <img src={datum.imageSource} alt={datum.imageAlternative} />
                    <div>
                        <h3>{datum.title}</h3>
                        <ReadMoreText
                            lineCount={3}
                            isUntogglable
                            text={datum.text}
                        />
                    </div>
                </div>
            )
        } </section>
    );
}

type PaginationButtonDisplayerProps = {
    selectedPageIndex: number;

    setSelectedPageIndex: React.Dispatch<React.SetStateAction<number>>;
};

function PaginationButtonDisplayer(props: PaginationButtonDisplayerProps): React.ReactElement {
    return (
        <section id="pagination-button-displayer">
            <div>
                <PaginationStepButton {...props} type="decrement" isDouble />
                <PaginationStepButton {...props} type="decrement" />
            </div>

            <Slider> {
                new Array(PAGE_COUNT)
                    .fill(null)
                    .map((_value, i) =>
                        <button
                            key={i}
                            className="pagination-button"

                            data-is-selected={i == props.selectedPageIndex}

                            onClick={_e => props.setSelectedPageIndex(i)}
                        >
                            {i + 1}
                        </button>
                    )
            } </Slider>

            <div>
                <PaginationStepButton {...props} type="increment" />
                <PaginationStepButton {...props} type="increment" isDouble />
            </div>
        </section>
    );
}

const TYPE_SYMBOLS: Array<{
    text: string;
} & Omit<PaginationStepButtonProps, "selectedPageIndex" | "setSelectedPageIndex">> = [
        { type: "decrement", text: "<" },
        { type: "increment", text: ">" },
        { type: "decrement", text: "<<", isDouble: true },
        { type: "increment", text: ">>", isDouble: true },
    ];

type PaginationStepButtonProps = {
    isDouble?: boolean;
    selectedPageIndex: number;
    type: "increment" | "decrement";

    setSelectedPageIndex: React.Dispatch<React.SetStateAction<number>>;
};

function PaginationStepButton(props: PaginationStepButtonProps): React.ReactElement {
    const typeSymbol = TYPE_SYMBOLS.find(symbol =>
        symbol.type == props.type &&
        symbol.isDouble == props.isDouble
    );

    const isHidden: boolean = (() => {
        switch (props.type) {
            case "decrement": return props.selectedPageIndex == 0;
            case "increment": return props.selectedPageIndex == PAGE_COUNT - 1;
        }
    })();

    function OnClick(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        if (isHidden) { return; }

        switch (props.type) {
            case "decrement":
                props.setSelectedPageIndex(previousValue => ScrollPaginationButtonIntoView(
                    (props.isDouble) ? 0 : previousValue - 1));
                break;

            case "increment":
                props.setSelectedPageIndex(previousValue => ScrollPaginationButtonIntoView(
                    (props.isDouble) ? PAGE_COUNT - 1 : previousValue + 1));
                break;
        }
    }

    function ScrollPaginationButtonIntoView(index: number): number {
        const button: HTMLElement = document.querySelector(
            `.pagination-button:nth-child(${index + 1})`) as HTMLElement;

        button.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });

        button.focus();

        return index;
    }

    return (
        <button
            className="pagination-step-button"

            data-is-hidden={isHidden}
            tabIndex={(isHidden) ? -1 : 0}

            onClick={OnClick}
        >
            {typeSymbol.text}
        </button>
    );
}