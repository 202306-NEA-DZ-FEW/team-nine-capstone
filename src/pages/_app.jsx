import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import "@/styles/globals.css";

import { UserProvider } from "@/context/UserContext";

import { i18n } from "../../next-i18next.config";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head>
                <title>Aide By Aide</title>
                <link rel='icon' href='/favicon.ico' />
                <meta charSet='UTF-8' />
                <meta
                    name='description'
                    content='organize volunteer local events and gatherings to create meaningful work and an impact, General public, mostly volunteers who want to create a change in the world.'
                />
                <meta
                    name='keywords'
                    content='HTML, CSS, JavaScript, NextJS, Donate, Volunteer, Organize, Event, Host, Attend, '
                />
                <meta
                    name='author'
                    content='ReCoded-FEDB-Algeria-2023, Khalil NOUI, Oualid ELHOUARI,  Hachem BOUHADDEDE, Imane OMARI'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
            </Head>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default appWithTranslation(MyApp, { i18n });
