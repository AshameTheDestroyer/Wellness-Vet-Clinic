import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { MainContext } from "../../index";
import Slider from "../../components/Slider/Slider";
import IconText from "../../components/IconText/IconText";
import DropDown from "../../utils/components/DropDown/DropDown";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";
import ReadMoreText from "../../utils/components/ReadMoreText/ReadMoreText";

import { Service, TEMPORARY_SERVICE_DATA } from "../AboutPage/AboutPage";

import "./ProfilePage.scss";

import PetIcon from "../../assets/icons/PetIcon";
import UserIcon from "../../assets/icons/UserIcon";
import MailIcon from "../../assets/icons/MailIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import PencilIcon from "../../assets/icons/PencilIcon";
import cat_image1 from "../../assets/images/wallpapers/cat1.png";
import cat_image2 from "../../assets/images/wallpapers/cat2.png";
import AppointmentIcon from "../../assets/icons/AppointmentIcon";
import rabbit_image from "../../assets/images/wallpapers/rabbit2.png";

const TEMPORARY_PET_DATA: Array<Pet & {
    imageSource: string;
    imageAlternative: string;
    usedServices: Array<Service>;
}> = [{
    id: 1,
    age: 2,
    userId: 1,
    name: "Bunbun",
    type: "Rabbit",
    gender: "male",
    imageSource: rabbit_image,
    imageAlternative: "A rabbit in plain fields.",
    usedServices: TEMPORARY_SERVICE_DATA.filter(_datum => Math.random() > 0.5),
}, {
    id: 2,
    age: 1,
    userId: 1,
    name: "Kitten",
    type: "Cat",
    gender: "female",
    imageSource: cat_image2,
    imageAlternative: "A cat standing on a couch.",
    usedServices: [],
}]

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
                <img src={cat_image1} alt="A cat looking upwards, admiringly." />
            </PageHeading>

            <main>
                <UserCard {...props} />
                <Outlet />
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
            <figure> {
                (userProfilePicture != null) ?
                    <img
                        src={userProfilePicture}
                        alt={`${userPossessiveNoun} profile picture.`}
                    /> :
                    <UserIcon />
            } </figure>

            <main>
                <IconText icon={<PhoneIcon />} text={props.loggedUser.phone} />
                <IconText icon={<MailIcon />} text={props.loggedUser.email} />
            </main>

            <Slider className="button-displayer" direction="vertical">
                <DropDown text="Edit Information" icon={<PencilIcon />}>
                    <Link
                        to="#"
                        children={<IconText icon={<PhoneIcon />} text="Edit Phone" />}
                    />

                    <Link
                        to="#"
                        children={<IconText icon={<MailIcon />} text="Edit Email" />}
                    />
                </DropDown>
                <Link
                    to="./MyPets"
                    children={<IconText icon={<PetIcon />} text="My Pets" />}
                />

                <Link
                    to="/Booking"
                    children={<IconText icon={<AppointmentIcon />} text="Book an Appointment" />}
                />
            </Slider>
        </div>
    );
}

export function ServiceDisplayer(): React.ReactElement {
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

type PetDashboardProps = {
    user: User;
};

export function PetDashboard(props: PetDashboardProps): React.ReactElement {
    return (
        <main id="pet-dashboard">
            <h2>My Pets</h2>

            {
                TEMPORARY_PET_DATA.map(pet =>
                    <div key={pet.id} className="pet-card">
                        <figure>
                            <img src={pet.imageSource} alt={pet.imageAlternative} />
                        </figure>
                        <main>
                            <h3>{pet.name}</h3>
                            <p>Type: {pet.type}</p>
                            <p>Age: {pet.age}</p>
                            <p data-gender={pet.gender}>Gender: </p>
                        </main>
                        <section>
                            <h4>Used Services:</h4>
                            {
                                (pet.usedServices.length > 0) ?
                                    <Slider> {
                                        pet.usedServices.map(service =>
                                            <Link
                                                key={service.id}
                                                to={`/About/?service-id=${service.id}`}
                                                children={service.title}
                                            />
                                        )
                                    } </Slider> :
                                    <p>No services are used for this pet yet.</p>
                            }
                        </section>
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