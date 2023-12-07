import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./AuthenticationPage.scss";

import dog_cat_wallpaper from "../../assets/images/wallpapers/dog_cat.jpg";
import dog_cat_wallpaper_blurred from "../../assets/images/wallpapers/dog_cat.blurred.jpg";
import CustomInput from "../../utils/components/CustomInput/CustomInput";
import REGEX_PATTERNS from "../../utils/constants/RegexPatterns";
import LazyImage from "../../utils/components/LazyImage/LazyImage";
import Logo from "../../layouts/components/Logo/Logo";

export enum AuthenticationMethod {
    SignUp = "sign-up",
    Login = "login",
}

export default function AuthenticationPage(): React.ReactElement {
    const [searchParams, _setSearchParams] = useSearchParams();
    const method: AuthenticationMethod = searchParams.get("method") as AuthenticationMethod;

    return (
        <main id="signing-page">
            <main>
                <Logo />
                <main>
                    <form method="POST" action="/">
                        {(() => {
                            switch (method) {
                                case AuthenticationMethod.SignUp: return <SignUpSection />;
                                case AuthenticationMethod.Login: return <LoginSection />;
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
                <Link to={`/Authentication?method=${AuthenticationMethod.Login}`}>Login</Link>
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
                <Link to={`/Authentication?method=${AuthenticationMethod.SignUp}`}>Sign up</Link>
            </p>
        </>
    );
}