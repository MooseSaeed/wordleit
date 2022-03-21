module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],

    theme: {
        extend: {
            typography: ({ theme }) => ({
                devtoStyle: {
                    css: {
                        a: {
                            color: "#818cf8",
                            "&:hover": {
                                color: "#a5b4fc",
                            },
                        },
                        "--tw-prose-links": theme("colors.indigo[400]"),
                        "--tw-prose-bullets": theme("colors.white"),
                        "--tw-prose-code": theme("colors.white"),
                        "--tw-prose-td-borders": theme("colors.gray[600]"),
                        "--tw-prose-th-borders": theme("colors.gray[600]"),
                        "--tw-prose-pre-code": theme("colors.black"),
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
