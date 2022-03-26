import { createApp } from "vue";
import router from "./router";
import Myapp from "./Myapp.vue";
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
        Myapp,
        Featurecard,
        Bodycomponent,
        marked,
    },
})
    .mixin(markedMixin)
    .use(router)
    .mount("#app");
