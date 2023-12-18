import React from "react";

import IconText from "../../components/IconText/IconText";
import Calendar from "../../utils/components/Calendar/Calendar";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";

import "./BookingPage.scss";

import dog_image from "../../assets/images/wallpapers/dog5.png";
import WhatsappIcon from "../../assets/icons/WhatsappIcon";

export default function BookingPage(): React.ReactElement {
    return (
        <main id="booking-page">
            <PageHeading>
                <img src={dog_image} alt="A girl petting her dog." />
            </PageHeading>

            <main>
                <h1>Book an Appointment</h1>

                <main>
                    <Calendar />

                    <div className="time-picker">
                        <h2>Morning</h2>
                        {
                            new Array(6).fill(null).map((_value, i) =>
                                <button>{`${~~(i / 2 + 9)}`.padStart(2, "0")}:{`${i % 2 * 30}`.padEnd(2, "0")}</button>
                            )
                        }
                    </div>

                    <div className="time-picker">
                        <h2>Evening</h2>
                        {
                            new Array(6).fill(null).map((_value, i) =>
                                <button>{`${~~(i / 2 + 14)}`.padStart(2, "0")}:{`${i % 2 * 30}`.padEnd(2, "0")}</button>
                            )
                        }
                    </div>
                </main>

                <button>
                    <IconText icon={<WhatsappIcon />} text="Book" />
                </button>
            </main>
        </main>
    );
}