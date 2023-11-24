import * as React from "react";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    return (
        <div className='w-screen bg-bgc-silver'>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
