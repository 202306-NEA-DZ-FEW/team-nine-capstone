import React from "react";

import YourEvents from "@/components/eventsPageComponents/YourEvents";

import Layout from "@/layout/Layout";

function yourEvents() {
    return (
        <Layout>
            <div>
                <YourEvents />
            </div>
        </Layout>
    );
}

export default yourEvents;
