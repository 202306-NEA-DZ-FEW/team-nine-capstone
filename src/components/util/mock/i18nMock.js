import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en", // Set your default language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
    resources: {}, // Add translations here if needed
});

export default i18n;
