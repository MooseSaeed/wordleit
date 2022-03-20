import { createRouter, createWebHistory } from "vue-router";

import Helloworld from "../components/Helloworld.vue";

const routes = [
    {
        path: "/",
        name: "Helloworld",
        component: Helloworld,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
