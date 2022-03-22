import { createApp } from "vue";
import router from "./router";
import Featurecard from "./components/Featurecard";
import Bodycomponent from "./components/Bodycomponent";
import { marked } from "marked";
import "@github/markdown-toolbar-element";

marked.setOptions({
    breaks: true,
});

const markedMixin = {
    methods: {
        md: function (input) {
            return marked(input);
        },
    },
};

createApp({
    components: {
        Featurecard,
        Bodycomponent,
        marked,
    },
})
    .mixin(markedMixin)
    .use(router)
    .mount("#app");
