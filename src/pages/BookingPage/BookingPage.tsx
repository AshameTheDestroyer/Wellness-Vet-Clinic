import React, { Fragment, useState } from "react";

import IconText from "../../components/IconText/IconText";
import Calendar from "../../utils/components/Calendar/Calendar";
import PageHeading from "../../layouts/components/PageHeading/PageHeading";

import "./BookingPage.scss";

import WhatsappIcon from "../../assets/icons/WhatsappIcon";
import dog_image from "../../assets/images/wallpapers/dog5.png";

export default function BookingPage(): React.ReactElement {
    const [checkedRadiobuttonIndex, setCheckedRadiobuttonIndex] = useState<number>(0);

    return (
        <main id="booking-page">
            <PageHeading>
                <img src={dog_image} alt="A girl petting her dog." />
            </PageHeading>

            <form>
                <h1>Book an Appointment</h1>

                <main>
                    <Calendar />
                    <TimePicker
                        title="Morning"
                        initialHour={9}
                        radiobuttonCount={6}
                        checkedRadiobuttonIndex={checkedRadiobuttonIndex}

                        setCheckedRadiobuttonIndex={setCheckedRadiobuttonIndex}
                    />
                    <TimePicker
                        title="Evening"
                        initialHour={14}
                        radiobuttonCount={6}
                        radiobuttonInitialIndex={6}
                        checkedRadiobuttonIndex={checkedRadiobuttonIndex}

                        setCheckedRadiobuttonIndex={setCheckedRadiobuttonIndex}
                    />
                </main>

                <button>
                    <IconText icon={<WhatsappIcon />} text="Book" />
                </button>
            </form>
        </main>
    );
}

type TimePickerProps = {
    title: string;
    initialHour: number;
    radiobuttonCount: number;
    radiobuttonInitialIndex?: number;
    checkedRadiobuttonIndex: number;

    setCheckedRadiobuttonIndex: React.Dispatch<React.SetStateAction<number>>;
};

function TimePicker(props: TimePickerProps): React.ReactElement {
    const radiobuttonInitialIndex: number = props.radiobuttonInitialIndex ?? 0;

    return (
        <div className="time-picker">
            <h2>{props.title}</h2>
            {
                new Array(props.radiobuttonCount).fill(null).map((_value, i) => {
                    const
                        text: string = `${~~(i / 2 + props.initialHour)}`.padStart(2, "0") + ":" + `${i % 2 * 30}`.padEnd(2, "0"),
                        index: number = i + radiobuttonInitialIndex;

                    return (
                        <Fragment key={index}>
                            <input
                                id={`${props.title}-radio-button-${index}`}

                                required
                                type="radio"
                                value={text}
                                name="time-picker"
                                defaultChecked={index == props.checkedRadiobuttonIndex}
                            />
                            <button
                                type="button"

                                onClick={_e => props.setCheckedRadiobuttonIndex(index)}

                                children={text}
                            />
                        </Fragment>
                    );
                })
            }
        </div>
    );
}