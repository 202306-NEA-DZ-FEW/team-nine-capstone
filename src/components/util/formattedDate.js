export function formatDate(dateString, t) {
    if (dateString) {
        const dateParts = dateString.split("/");
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const date = new Date(year, month, day);

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
        const monthName = months[month];
        const yearValue = year;

        if (new Date().getFullYear() === yearValue) {
            return `${t(dayOfWeek)}, ${formattedDay} ${t(monthName)}`;
        } else {
            return `${t(dayOfWeek)}, ${formattedDay} ${t(
                monthName
            )} ${yearValue}`;
        }
    }

    return "";
}
