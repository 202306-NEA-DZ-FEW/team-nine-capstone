import { appWithTranslation } from "next-i18next";

import "@/styles/globals.css";

import { UserProvider } from "@/context/UserContext";

import { i18n } from "../../next-i18next.config";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default appWithTranslation(MyApp, { i18n });
