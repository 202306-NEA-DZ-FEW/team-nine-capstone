import { render, screen } from "@testing-library/react";
import React from "react";

import EventCard from "./EventCard";

const mockEvent = {
    image: "https://example.com/event-image.jpg",
    date: " 15 January",
    title: "Sample Event",
    about: "This is a sample event description.",
};

test("renders the EventCard component", () => {
    render(<EventCard TheEvent={mockEvent} />);
    const eventCard = screen.getByText("15 January");
    expect(eventCard).toBeInTheDocument();
});

test("displays the event title", () => {
    render(<EventCard TheEvent={mockEvent} />);
    const title = screen.getByText("Sample Event");
    expect(title).toBeInTheDocument();
});

test("displays the event description", () => {
    render(<EventCard TheEvent={mockEvent} />);
    const description = screen.getByText("This is a sample event description.");
    expect(description).toBeInTheDocument();
});

test("displays the event sponsor", () => {
    render(<EventCard TheEvent={mockEvent} />);
    const sponsor = screen.getByText("Pebble");
    expect(sponsor).toBeInTheDocument();
});
