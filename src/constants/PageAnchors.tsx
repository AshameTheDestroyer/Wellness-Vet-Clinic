const PAGE_ANCHORS: Array<PageAnchor> = [
    { name: "Home", url: "" },
    "About",
    "Services",
    "Contact Us",
    { name: "Pet Dashboard", url: "Pets" },
    {
        name: "Appointment Management",
        url: "Appointments",
        subAnchors: [{
            name: "Appointment Booking",
            url: "Booking",
        }, {
            name: "Appointment Dashboard",
            url: "",
        }],
    },
    { name: "Doctor Dashboard", url: "Doctors" },
    { name: "Reporting & Analytics", url: "Reports" },
];

export default PAGE_ANCHORS;