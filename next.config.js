/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
    // mak sure there is  no rights infringments on the images used
    images: {
        domains: [
            "www.signupgenius.com",
            "www.greenbiz.com",
            "www.cleantech.com",
            "upload.wikimedia.org",
            "cdn0.handsonconnect.org",
        ],
    },
};
