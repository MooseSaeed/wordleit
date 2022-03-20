require("./bootstrap");

import { createApp } from "vue";
import router from "./router";
import Featurecard from "./components/Featurecard";
import Bodycomponent from "./components/Bodycomponent";

createApp({
    components: {
        Featurecard,
        Bodycomponent,
    },
})
    .use(router)
    .mount("#app");
