const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .vue({
        options: {
            compilerOptions: {
                isCustomElement: (tag) =>
                    [
                        "md-linedivider",
                        "md-bold",
                        "md-italic",
                        "md-link",
                        "md-ordered-list",
                        "md-unordered-list",
                        "md-header",
                        "md-quote",
                        "md-code",
                        "md-table",
                        "md-image",
                        "md-underline",
                        "md-strikethrough",
                        "markdown-toolbar",
                        "md-next-line",
                        "vue-plyr",
                    ].includes(tag),
            },
        },
    })
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);
