import { createRouter, createWebHistory } from "vue-router";

import Featurecard from "../components/Featurecard.vue";
import Card from "../components/card/Card.vue";
import Article from "../components/main/Article.vue";

const routes = [
    {
        path: "/",
        name: "Featurecard",
        component: Featurecard,
        Card,
        meta: {
            enterClass: "animate__animated animate__bounceInDown animate__slow",
            leaveClass: "animate__animated animate__bounceOutUp",
        },
    },
    {
        path: "/article",
        name: "Article",
        component: Article,
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
