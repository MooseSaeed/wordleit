import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "animate.css";
import Featurecard from "./components/Featurecard";
import Bodycomponent from "./components/Bodycomponent";
import { marked } from "marked";
import "../../public/markdowntoolbar";

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
        App,
        Featurecard,
        Bodycomponent,
        marked,
    },
})
    .mixin(markedMixin)
    .use(router)
    .mount("#app");
