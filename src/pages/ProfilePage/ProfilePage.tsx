import React, { useContext } from "react";
import { MainContext } from "../../index";

import "./ProfilePage.scss";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";
import IconText from "../../components/IconText/IconText";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import { TEMPORARY_SERVICE_DATA } from "../AboutPage/AboutPage";
import Slider from "../../components/Slider/Slider";
import ReadMoreText from "../../utils/components/ReadMoreText/ReadMoreText";

export default function ProfilePage(): React.ReactElement {
    const MainState = useContext(MainContext);

    return (
        <main
            id="profile-page"

            data-is-logged-in={MainState.loggedUser != null}
        >
            {(MainState.loggedUser != null) ? <ProfileMainSection loggedUser={MainState.loggedUser} /> : <NotLoggedInMessage />}
        </main>
    );
}

type ProfileMainSectionProps = {
    loggedUser: User;
};

function ProfileMainSection(props: ProfileMainSectionProps): React.ReactElement {
    return (
        <>
            <PageHeading title={props.loggedUser.name}>
            </PageHeading>

            <main>
                <UserCard {...props} />
                <ServiceDisplayer />
            </main>
        </>
    );
}

type UserCardProps = {
    loggedUser: User;
};

function UserCard(props: UserCardProps): React.ReactElement {
    const userPossessiveNoun: string = props.loggedUser.name + "'"
        + ((["s", "sh"].some(c => props.loggedUser.name.toLowerCase().endsWith(c))) ? "" : "s");

    const userProfilePicture: string = null;

    return (
        <div id="user-card">
            <figure>
                <img
                    // TODO: add default profile picture.
                    src={userProfilePicture ?? ""}
                    alt={`${userPossessiveNoun} profile picture.`}
                />
            </figure>

            <main>
                <IconText icon={<PhoneIcon />} text={props.loggedUser.phone} />
                {/*// TODO: add email icon.*/}
                <IconText icon={<PhoneIcon />} text={props.loggedUser.email} />
            </main>

            <Slider className="button-displayer" direction="vertical">
                <button>
                    <IconText icon={<PhoneIcon />} text="Edit Information" />
                </button>
                <button>
                    <IconText icon={<PhoneIcon />} text="My Pets" />
                </button>
                <button>
                    <IconText icon={<PhoneIcon />} text="Book an Appointment" />
                </button>
            </Slider>
        </div>
    );
}

function ServiceDisplayer(): React.ReactElement {
    return (
        <main id="service-displayer">
            <h2>Clinic Services</h2>

            {
                TEMPORARY_SERVICE_DATA.map(service =>
                    <div key={service.id} className="service-card">
                        <h3>{service.title}</h3>
                        <ReadMoreText
                            lineCount={3}
                            text={service.description}
                        />
                    </div>
                )
            }
        </main>
    );
}

function NotLoggedInMessage(): React.ReactElement {
    return (
        <main>
            <h1>You're not currently logged in</h1>
            <p>Sign in within your account or create a new account to view your profile.</p>
        </main>
    );
}