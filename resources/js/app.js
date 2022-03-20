require("./bootstrap");

import { createApp } from "vue";
import router from "./router";
import Helloworld from "./components/Helloworld";

createApp({
    components: {
        Helloworld,
    },
})
    .use(router)
    .mount("#app");
