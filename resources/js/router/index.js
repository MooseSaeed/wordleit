import { createRouter, createWebHistory } from "vue-router";

import Homepage from "../components/main/Homepage.vue";
import Wordleiteditor from "../components/main/Wordleiteditor.vue";

const routes = [
    {
        path: "/",
        name: "Homepage",
        component: Homepage,
        meta: {
            enterClass: "animate__animated animate__bounceInDown animate__slow",
            leaveClass: "animate__animated animate__bounceOutUp",
        },
    },
    {
        path: "/wordleiteditor",
        name: "Wordleiteditor",
        component: Wordleiteditor,
        meta: {
            enterClass: "animate__animated animate__fadeInLeft",
            leaveClass: "animate__animated animate__bounceOutUp",
        },
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
