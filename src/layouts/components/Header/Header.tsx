import React, { useState } from "react";

import NavigationBar from "../../../components/NavigationBar/NavigationBar.tsx";

import "./Header.scss";

import Logo from "../Logo/Logo.tsx";
import PAGE_ANCHORS from "../../../constants/PageAnchors.tsx";
import Modal from "../../../utils/components/Modal/Modal.tsx";
import CustomInput from "../../../utils/components/CustomInput/CustomInput.tsx";
import REGEX_PATTERNS from "../../../utils/constants/RegexPatterns.tsx";
import CrossIcon from "../../../assets/icons/CrossIcon.tsx";

import parrot_image from "../../../assets/images/transparent/parrot.png";

export default function Header(): React.ReactElement {
    const [isSigningModalOpen, setIsSigningModalOpen] = useState<boolean>(false);

    return (
        <header id="header" className="sticking-header">
            <Logo />
            <NavigationBar anchors={PAGE_ANCHORS} />
            <button onClick={_e => setIsSigningModalOpen(true)}>Sign in</button>

            <SigningModal
                isOpen={isSigningModalOpen}

                setIsOpen={setIsSigningModalOpen}
            />
        </header>
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
            <button id="signing-modal-button" onClick={_e => props.setIsOpen(false)}>
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
                isRequired
                type="text"
                pattern={REGEX_PATTERNS.username.value}
                title={REGEX_PATTERNS.username.message}
                placeholder="Name"
            />

            <CustomInput
                name="password"
                isRequired
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
                isRequired
                type="text"
                pattern={REGEX_PATTERNS.username.value}
                title={REGEX_PATTERNS.username.message}
                placeholder="Name"
            />

            <CustomInput
                name="email"
                isRequired
                type="email"
                pattern={REGEX_PATTERNS.mail.value}
                title={REGEX_PATTERNS.mail.message}
                placeholder="Email"
            />

            <CustomInput
                name="password"
                isRequired
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