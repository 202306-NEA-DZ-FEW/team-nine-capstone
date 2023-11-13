export default function formatDate(eventData) {
    if (eventData?.date) {
        const dateParts = eventData.date.split("/");
        const [day, month, year] = dateParts.map((part) => parseInt(part, 10));

        const date = new Date(year, month - 1, day);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const dayOfWeek = daysOfWeek[date.getDay()];
        const formattedDay = ("0" + day).slice(-2);
        const monthName = months[month - 1];
        const yearValue = year;

        return {
            day,
            month,
            year: yearValue,
            formattedDay,
            formattedDate:
                new Date().getFullYear() === yearValue
                    ? `${dayOfWeek}, ${formattedDay} ${monthName}`
                    : `${dayOfWeek}, ${formattedDay} ${monthName} ${yearValue}`,
        };
    }
}
