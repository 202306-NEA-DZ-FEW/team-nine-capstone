import React from "react";

import IEvent from "@/components/eventsPageComponents/IEvents";

import Layout from "@/layout/Layout";

function myEvents() {
    return (
        <Layout>
            <div>
                <IEvent />
            </div>
        </Layout>
    );
}

export default myEvents;
