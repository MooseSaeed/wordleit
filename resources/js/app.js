require("./bootstrap");

import { createApp } from "vue";
import router from "./router";
import Featurecard from "./components/Featurecard";

createApp({
    components: {
        Featurecard,
    },
})
    .use(router)
    .mount("#app");
