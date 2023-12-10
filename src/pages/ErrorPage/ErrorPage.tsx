import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import "../../utils/extensions/ToTitleCase";

import "./ErrorPage.scss";

import cat_image from "../../assets/images/transparent/cat3.png";

export enum ErrorType {
    NotFound = "not-found",
    Unauthorized = "unauthorized",
}

export default function ErrorPage(): React.ReactElement {
    const [param, setParam] = useSearchParams();
    const errorType: ErrorType = param.get("type") as ErrorType ?? ErrorType.NotFound;

    return (
        <main id="error-page">
            <main>
                <section>
                    <h1>{errorType.replace(/-/g, " ").toTitleCase()}</h1>
                    <p> {(() => {
                        switch (errorType) {
                            case ErrorType.NotFound: return "The page your looking for is nowhere to be found.";
                            case ErrorType.Unauthorized: return "The page your accessing is out of your reach.";
                        }
                    })()} </p>
                    <button>
                        <Link to="/">Go back</Link>
                    </button>
                </section>
            </main>

            <img src={cat_image} alt="A cat looking upwards." />
        </main>
    );
}