import React, { useState } from "react";

import "./RegistrationPage.scss";

import logo from "../../assets/images/transparent/logo.png";
import dog_cat_wallpaper from "../../assets/images/wallpapers/dog_cat.jpg";
import dog_cat_wallpaper_blurred from "../../assets/images/wallpapers/dog_cat.blurred.jpg";
import CustomInput from "../../utils/components/CustomInput/CustomInput";
import REGEX_PATTERNS from "../../utils/constants/RegexPatterns";
import LazyImage from "../../utils/components/LazyImage/LazyImage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export enum RegistrationMethod {
    SignUp = "sign-up",
    Login = "login",
}

export default function RegistrationPage(): React.ReactElement {
    const [searchParams, _setSearchParams] = useSearchParams();
    const method: RegistrationMethod = searchParams.get("method") as RegistrationMethod;
    const Navigate = useNavigate();

    return (
        <main id="signing-page">
            <main>
                <img id="logo" src={logo} alt="The logo of the website." onClick={() => Navigate("/")} />
                <main>
                    <form method="POST" action="/">
                        {(() => {
                            switch (method) {
                                case RegistrationMethod.SignUp: return <SignUpSection />;
                                case RegistrationMethod.Login: return <LoginSection />;
                            }
                        })()}
                    </form>
                    <Link to="/">Go back</Link>
                </main>
                <figure>
                    <LazyImage
                        originalImageSource={dog_cat_wallpaper}
                        pixelatedImageSource={dog_cat_wallpaper_blurred}
                        alternativeText="A dog and a cat staring at each other in a cute way."
                    />
                </figure>
            </main>
        </main >
    );
}

function SignUpSection(): React.ReactElement {
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <CustomInput
                placeholder="Username"
                name="username"
                type="text"
                pattern={REGEX_PATTERNS.username.value}
                title={REGEX_PATTERNS.username.message}
            />
            <CustomInput
                placeholder="Email"
                name="email"
                type="email"
                pattern={REGEX_PATTERNS.mail.value}
                title={REGEX_PATTERNS.mail.message}
            />
            <CustomInput
                placeholder="Password"
                name="password"
                type="password"
                pattern={REGEX_PATTERNS.password.value}
                title={REGEX_PATTERNS.password.message}
                value={password}

                events={{ onChange: e => setPassword(e.target.value) }}
            />
            <CustomInput
                placeholder="Confirm Password"
                name="confirm-password"
                type="password"
                pattern={password}
                title={"Password should match the one set above."}
            />

            <div>
                <input
                    id="terms-and-conditions-input-field"
                    type="checkbox"
                    name="terms-and-conditions"
                    required
                />
                <label htmlFor="terms-and-conditions-input-field">
                    I agree with the website's terms and conditions
                </label>
            </div>

            <button>Sign up</button>

            <p>
                Already have an account?{" "}
                <Link to={`/Registration?method=${RegistrationMethod.Login}`}>Login</Link>
            </p>
        </>
    );
}

function LoginSection(): React.ReactElement {
    return (
        <>
            <CustomInput
                placeholder="Email"
                name="email"
                type="email"
                pattern={REGEX_PATTERNS.mail.value}
                title={REGEX_PATTERNS.mail.message}
            />
            <CustomInput
                placeholder="Password"
                name="password"
                type="password"
                pattern={REGEX_PATTERNS.password.value}
                title={REGEX_PATTERNS.password.message}
            />

            <button>Login</button>

            <p>
                Doesn't have an account?{" "}
                <Link to={`/Registration?method=${RegistrationMethod.SignUp}`}>Sign up</Link>
            </p>
        </>
    );
}