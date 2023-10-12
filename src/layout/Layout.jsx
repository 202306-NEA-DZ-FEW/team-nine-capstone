import * as React from "react";

import Navbar from "@/components/navbar/Navbar";

export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    return (
        <div className='fit-w-screen'>
            <Navbar />
            {children}
            {/* <Footer /> */}
        </div>
    );
}
