const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ar"],
        localDetection: false,
        localePath: path.resolve("./public/locales"),
        defaultNS: "common",
        serializeConfig: false,
    },
};
