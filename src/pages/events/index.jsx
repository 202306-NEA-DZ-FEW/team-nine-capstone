import React from "react";

import EventList from "@/components/eventsPageComponents/EventList";

import Layout from "@/layout/Layout";

function index() {
    return (
        <Layout>
            {" "}
            <EventList />
        </Layout>
    );
}

export default index;
