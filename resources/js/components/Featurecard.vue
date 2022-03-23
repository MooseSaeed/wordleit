<template>
    <section
        class="grid lg:grid-cols-3 md:grid-cols-2 gap-y-10 justify-items-center items-center"
    >
        <router-link to="/article">
            <Card dataImage="./images/pic-sample.jpg">
                <template v-slot:header>
                    <h2 class="text-white text-2xl font-bold">
                        WordleUp Text Editor
                    </h2>
                </template>
                <template v-slot:content>
                    <p class="relative text-white">
                        A text editor supported with Github Markdown features
                        and AI Speech
                    </p>
                </template>
            </Card>
        </router-link>
    </section>
</template>

<script>
import Card from "./card/Card.vue";
export default {
    name: "Featurecard",
    components: { Card },
};
</script>

<style scoped>
h2,
p {
    text-shadow: -3px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
