import { createRouter, createWebHistory } from "vue-router";

import Featurecard from "../components/Featurecard.vue";
import Card from "../components/Card.vue";

const routes = [
    {
        path: "/",
        name: "Card",
        component: Featurecard,
        Card,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
