import React, { useContext, useEffect, useState } from "react";

import NavigationBar from "../../../components/NavigationBar/NavigationBar.tsx";

import "./Header.scss";

import Logo from "../Logo/Logo.tsx";
import PAGE_ANCHORS from "../../../constants/PageAnchors.tsx";
import Modal from "../../../utils/components/Modal/Modal.tsx";
import CustomInput from "../../../utils/components/CustomInput/CustomInput.tsx";
import REGEX_PATTERNS from "../../../utils/constants/RegexPatterns.tsx";
import CrossIcon from "../../../assets/icons/CrossIcon.tsx";

import parrot_image from "../../../assets/images/transparent/parrot.png";
import HamburgerButton from "../../../utils/components/HamburgerButton/HamburgerButton.tsx";
import HamburgerButtonIcon from "../../../assets/icons/HamburgerButtonIcon.tsx";
import { MainContext } from "../../../index.tsx";
import DropDown from "../../../utils/components/DropDown/DropDown.tsx";
import { Link } from "react-router-dom";

export default function Header(): React.ReactElement {
    return (
        <header id="header" className="sticking-header">
            <Logo />

            <NavigationContainer />
        </header>
    );
}

function NavigationContainer(): React.ReactElement {
    const [isNavigationContainerOpen, setIsNavigationContainerOpen] = useState<boolean>(false);

    return (
        <>
            <button
                id="hamburger-button"

                onClick={_e => setIsNavigationContainerOpen(true)}

                children={<HamburgerButtonIcon />}
            />

            <section
                id="navigation-background"

                data-is-visible={isNavigationContainerOpen}

                onClick={_e => setIsNavigationContainerOpen(false)}
            />

            <section
                id="navigation-container"

                data-is-open={isNavigationContainerOpen}
            >
                <button
                    id="navigation-container-close-button"

                    onClick={_e => setIsNavigationContainerOpen(false)}

                    children={<CrossIcon />}
                />

                <NavigationBar anchors={PAGE_ANCHORS} />

                <SigningInButton />
            </section>
        </>
    );
}

function SigningInButton(): React.ReactElement {
    const MainState = useContext(MainContext);
    const [isSigningModalOpen, setIsSigningModalOpen] = useState<boolean>(false);

    return (
        (MainState.loggedUser != null) ?
            <div id="logged-user-displayer">
                <p>{MainState.loggedUser.name}</p>

                <DropDown>
                    <Link to="/Profile">Profile</Link>
                    <button
                        id="sign-button"

                        onClick={_e => MainState.setLoggedUser(null)}

                        children="Sign out" /
                    >
                </DropDown>
            </div> :
            <>
                <button
                    id="sign-button"

                    onClick={_e => setIsSigningModalOpen(true)}

                    children="Sign in"
                />

                <SigningModal
                    isOpen={isSigningModalOpen}

                    setIsOpen={setIsSigningModalOpen}
                />
            </>
    );
}

enum SigningMethod {
    SignUp = "Sign up",
    SignIn = "Sign in",
}

type SigningModalProps = {
    isOpen: boolean;

    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SigningModal(props: SigningModalProps): React.ReactElement {
    const [signingMethod, setSigningMethod] = useState<SigningMethod>(SigningMethod.SignIn);

    useEffect(() => {
        setSigningMethod(SigningMethod.SignIn);
    }, [props.isOpen]);

    return (
        <Modal
            id="signing-modal"

            isForm
            method="POST"
            isOpen={props.isOpen}
            backgroundProps={{
                id: "signing-modal-background"
            }}

            setIsOpen={props.setIsOpen}
        >
            <button id="signing-modal-close-button" onClick={_e => props.setIsOpen(false)}>
                <CrossIcon />
            </button>

            <h2>{signingMethod}</h2>

            <main>
                <section id="custom-input-displayer">
                    {
                        (signingMethod == SigningMethod.SignIn) ?
                            <SigningInSection /> :
                            <SigningUpSection />
                    }
                </section>

                <button>{signingMethod}</button>

                <p>
                    {(signingMethod == SigningMethod.SignIn) ? "You don't" : "Already"}
                    {" "}have an account?{" "}
                    <a
                        href="#"

                        onClick={e => (setSigningMethod(previousValue =>
                            (previousValue == SigningMethod.SignIn) ?
                                SigningMethod.SignUp : SigningMethod.SignIn
                        ), e.preventDefault())}
                    >
                        {
                            (signingMethod == SigningMethod.SignIn) ?
                                SigningMethod.SignUp : SigningMethod.SignIn
                        }
                    </a>
                </p>
            </main>

            <figure>
                <img src={parrot_image} alt="A parrot sitting on a branch." />
            </figure>
        </Modal>
    );
}

function SigningInSection(): React.ReactElement {
    return (
        <>
            <CustomInput
                name="name"
                type="text"
                pattern={REGEX_PATTERNS.username.value}
                title={REGEX_PATTERNS.username.message}
                placeholder="Name"
            />

            <CustomInput
                name="password"
                type="password"
                placeholder="Password"
            />
        </>
    );
}

function SigningUpSection(): React.ReactElement {
    const [isSelectEmpty, setIsSelectEmpty] = useState<boolean>(true);

    return (
        <>
            <CustomInput
                name="name"
                type="text"
                pattern={REGEX_PATTERNS.username.value}
                title={REGEX_PATTERNS.username.message}
                placeholder="Name"
            />

            <CustomInput
                name="email"
                type="email"
                pattern={REGEX_PATTERNS.mail.value}
                title={REGEX_PATTERNS.mail.message}
                placeholder="Email"
            />

            <CustomInput
                name="password"
                type="password"
                pattern={REGEX_PATTERNS.password.value}
                title={REGEX_PATTERNS.password.message}
                placeholder="Password"
            />

            <div className="select-field">
                <select
                    required
                    data-is-empty={isSelectEmpty}

                    onChange={e => setIsSelectEmpty(e.target.value == "")}
                >
                    {isSelectEmpty && <option></option>}
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <label>Gender<sup> *</sup></label>
            </div>
        </>
    );
}
