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
    },
    {
        path: "/article",
        name: "Article",
        component: Article,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
