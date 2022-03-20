import { createRouter, createWebHistory } from "vue-router";

import Featurecard from "../components/Featurecard.vue";
import Card from "../components/card/Card.vue";

const routes = [
    {
        path: "/",
        name: "Featurecard",
        component: Featurecard,
        Card,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
