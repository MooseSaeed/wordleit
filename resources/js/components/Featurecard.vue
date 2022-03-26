<template>
    <section class="grid grid-cols-2 justify-items-center items-center">
        <router-link to="/wordleiteditor">
            <Card dataImage="./images/wordleitoutcombined.gif">
                <template v-slot:header>
                    <h2 class="text-white text-2xl font-semibold">
                        Wordleit Text Editor
                    </h2>
                </template>
                <template v-slot:content>
                    <p class="relative text-white">
                        A markdown text editor supported with AI Speech
                    </p>
                </template>
            </Card>
        </router-link>
        <Card dataImage="./images/pic-sample.jpg">
            <template v-slot:header>
                <h2 class="text-white text-2xl font-semibold">Coming Soon!</h2>
            </template>
            <template v-slot:content>
                <p class="relative text-white">Stay Tuned</p>
            </template>
        </Card>
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
