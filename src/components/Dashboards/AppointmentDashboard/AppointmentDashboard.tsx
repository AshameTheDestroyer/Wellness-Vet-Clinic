import React from "react";

import CRUDDropDown from "../../CRUDDropDown/CRUDDropDown";

import "./AppointmentDashboard.scss";

const TEMPORARY_APPOINTMENT_DATA: Array<Appointment> = new Array(23).fill(null).map((_datum, i) => ({
    id: i + 1,
    userId: ~~(Math.random() * 10) + 1,
    startDate: new Date(
        ~~(Math.random() * 10) + 2020,
        ~~(Math.random() * 12),
        ~~(Math.random() * 30),
        ~~(Math.random() * 6) + 10,
        (~~(Math.random() * 3) + 1) * 15,
    ),
    durationInMinutes: (~~(Math.random() * 12) + 1) * 15,
}));

export default function AppointmentDashboard(): React.ReactElement {
    return (
        <main id="appointment-dashboard">
            <h2>{"Appointments"}</h2>
            {
                TEMPORARY_APPOINTMENT_DATA.map(appointment =>
                    <div key={appointment.id} className="card appointment-card">
                        <h3>{appointment.startDate.toLocaleString()}</h3>
                        <p>
                            Duration:{" "}
                            {(appointment.durationInMinutes >= 60) && `${~~(appointment.durationInMinutes / 60)}hrs`}
                            {(appointment.durationInMinutes % 60 != 0) && (appointment.durationInMinutes >= 60) && " and "}
                            {(appointment.durationInMinutes % 60 != 0) && `${appointment.durationInMinutes % 60}mins`}
                        </p>
                        <CRUDDropDown />
                    </div>
                )
            }
        </main>
    );
}