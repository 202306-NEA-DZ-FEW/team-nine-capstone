/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { hostname: "www.signupgenius.com" },
            { hostname: "www.greenbiz.com" },
            { hostname: "www.cleantech.com" },
            { hostname: "upload.wikimedia.org" },
            { hostname: "cdn0.handsonconnect.org" },
            { hostname: "cdn.wallpapersafari.com" },
            { hostname: "cdn.mos.cms.futurecdn.net" },
            { hostname: "firebasestorage.googleapis.com" },
        ],
    },
};
