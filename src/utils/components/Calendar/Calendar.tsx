import React, { useEffect, useState } from "react";

import { ChildlessComponentProps } from "../../types/ComponentProps";

import "./Calendar.scss";

import DropDownIcon from "../../../assets/icons/DropDownIcon";

const
    DAYS: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    MONTHS: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type CalendarProps = ChildlessComponentProps;

export default function Calendar(props: CalendarProps): React.ReactElement {
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    const
        date: Date = new Date(currentYear, currentMonth),
        year: number = date.getFullYear(),
        monthIndex: number = date.getMonth(),
        month: string = MONTHS[monthIndex],
        monthDayCount: number = new Date(year, monthIndex + 1, 0).getDate(),
        firstDayIndex: number = new Date(year, monthIndex, 1).getDay(),
        lastDayIndex: number = new Date(year, monthIndex, monthDayCount).getDay(),
        lastMonthDayCount: number = new Date(year, monthIndex, 0).getDate(),
        systemDate: Date = new Date(),
        systemYear: number = systemDate.getFullYear(),
        systemMonth: number = systemDate.getMonth(),
        systemDay: number = systemDate.getDate();

    useEffect(() => {
        if (currentMonth < 0) {
            setCurrentMonth(11);
            setCurrentYear(previousValue => previousValue - 1);
            return;
        }

        if (currentMonth >= 12) {
            setCurrentMonth(0);
            setCurrentYear(previousValue => previousValue + 1);
            return;
        }
    }, [currentMonth]);

    return (
        <div
            id={props.id}
            className={[
                "calendar",
                props.className,
            ].toClassName()}
        >
            <header>
                <button
                    className="calendar-step-button"

                    data-step-type="previous"

                    onClick={_e => setCurrentMonth(previousValue => previousValue - 1)}

                    children={<DropDownIcon />}
                />

                <h3>{month} {year}</h3>

                <button
                    className="calendar-step-button"

                    data-step-type="next"

                    onClick={_e => setCurrentMonth(previousValue => previousValue + 1)}

                    children={<DropDownIcon />}
                />
            </header>

            <main>
                <header> {
                    DAYS.map((day, i) =>
                        <div key={i}>{day.slice(0, 3)}</div>
                    )
                } </header>

                <main>
                    {
                        new Array(firstDayIndex).fill(null).map((_value, i) =>
                            <button
                                key={i}

                                tabIndex={-1}
                                data-is-inactive={true}

                                children={lastMonthDayCount - firstDayIndex + i + 1}
                            />
                        )
                    }
                    {
                        new Array(monthDayCount).fill(null).map((_value, i) =>
                            <button
                                key={i}

                                data-is-current-day={
                                    (i == systemDay - 1) &&
                                    (currentYear == systemYear) &&
                                    (currentMonth == systemMonth)
                                }

                                children={i + 1}
                            />
                        )
                    }
                    {
                        new Array(DAYS.length - lastDayIndex - 1 + DAYS.length).fill(null).map((_value, i) =>
                            <button
                                key={i}

                                tabIndex={-1}
                                data-is-inactive={true}

                                children={i + 1}
                            />
                        )
                    }
                </main>
            </main>
        </div>
    );
}