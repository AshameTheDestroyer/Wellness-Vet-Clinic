import React from "react";

import "./UserDashboard.scss";

import UserIcon from "../../../assets/icons/UserIcon";
import CRUDDropDown from "../../CRUDDropDown/CRUDDropDown";

const TEMPORARY_USER_DATA: Array<User> = new Array(10).fill(null).map((_datum, i) => ({
    id: i + 1,
    email: `user${i + 1}@gmail.com`,
    name: `User ${i + 1}`,
    gender: (Math.random() > 0.5) ? "male" : "female",
    phone: "+999888555333",
}));

export default function UserDashboard(): React.ReactElement {
    return (
        <main id="user-dashboard">
            <h2>Users</h2>

            {
                TEMPORARY_USER_DATA.map(user =>
                    <div key={user.id} className="card user-card">
                        <figure>
                            <UserIcon />
                        </figure>
                        <main>
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p data-gender={user.gender}>Gender: </p>
                        </main>
                        <CRUDDropDown />
                    </div>
                )
            }
        </main>
    );
}