import React, { useContext, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";

import { MainContext } from "../../index";
import Slider from "../../components/Slider/Slider";
import IconText from "../../components/IconText/IconText";
import DropDown from "../../utils/components/DropDown/DropDown";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";
import ReadMoreText from "../../utils/components/ReadMoreText/ReadMoreText";

import { TEMPORARY_SERVICE_DATA } from "../AboutPage/AboutPage";

import "./ProfilePage.scss";

import PetIcon from "../../assets/icons/PetIcon";
import UserIcon from "../../assets/icons/UserIcon";
import MailIcon from "../../assets/icons/MailIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import PencilIcon from "../../assets/icons/PencilIcon";
import cat_image from "../../assets/images/wallpapers/cat1.png";
import AppointmentIcon from "../../assets/icons/AppointmentIcon";
import DropDownIcon from "../../assets/icons/DropDownIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";

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
                <img src={cat_image} alt="A cat looking upwards, admiringly." />
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
                {
                    (props.loggedUser?.isAdministrator) &&
                    <DropDown id="dashboard-drop-down" text="Dashboards" icon={<DashboardIcon />}>
                        <Link
                            to="/Profile/Dashboards/Pets"
                            children={<IconText icon={<PetIcon />} text="Pets" />}
                        />
                        <Link
                            to="/Profile/Dashboards/Users"
                            children={<IconText icon={<UserIcon />} text="Users" />}
                        />
                        <Link
                            to="/Profile/Dashboards/Items"
                            children={<IconText icon={<PencilIcon />} text="Items" />}
                        />
                        <Link
                            to="/Profile/Dashboards/Appointments"
                            children={<IconText icon={<AppointmentIcon />} text="Appointments" />}
                        />
                    </DropDown>
                }
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
                    <div key={service.id} className="card service-card">
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