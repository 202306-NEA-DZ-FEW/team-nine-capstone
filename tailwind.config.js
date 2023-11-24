/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                Montserrat: ["Montserrat", "sans-serif"], // for titles
                Lora: ["Lora", "serif"], // for sub titles
                Roboto: ["Roboto", "sans-serif"], // for text
                OpenSans: ["Open Sans", "sans-serif"], // for details
            },
            colors: {
                bgc: {
                    // our background colors
                    sunflower: "#FFCA28", // Amber-400
                    silver: "#EEEEEE", // grey-200
                    ForestGreen: "#388E3C", // grenn-700
                    Viridescent: "#50c878", // green-200
                    Charcoal: "#424242", //gray-800
                    Tranquil: "#80CBC4", // teal-200
                },
                txtc: {
                    // our text color, each suits a certain background to a certain degree.
                    DarkCharcoal: "#333333", // for Amber-400, Grey-200  and  Teal-200 (#80CBC4, #EEEEEE, #333333 )
                    Ivory: "#FFFFF0", // For Emerald-500 ad the Green-700 (#388E3C, #50C878)
                    LightGray: "#AAAAAA", // For Grey-800 (#424242)
                },
            },
        },
    },
    plugins: [],
};
