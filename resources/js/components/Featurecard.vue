<template>
    <Card dataImage="./images/pic-sample.jpg">
        <template v-slot:header>
            <h2 class="text-white text-2xl font-bold">
                This is the card Title
            </h2>
        </template>
        <template v-slot:content>
            <p class="relative text-white">This is the card description</p>
        </template>
    </Card>
    <Card dataImage="./images/pic-sample.jpg">
        <template v-slot:header>
            <h2 class="text-white text-2xl font-bold">
                This is the card Title
            </h2>
        </template>
        <template v-slot:content>
            <p class="relative text-white">This is the card description</p>
        </template>
    </Card>
    <Card dataImage="./images/pic-sample.jpg">
        <template v-slot:header>
            <h2 class="text-white text-2xl font-bold">
                This is the card Title
            </h2>
        </template>
        <template v-slot:content>
            <p class="relative text-white">This is the card description</p>
        </template>
    </Card>
    <Card dataImage="./images/pic-sample.jpg">
        <template v-slot:header>
            <h2 class="text-white text-2xl font-bold">
                This is the card Title
            </h2>
        </template>
        <template v-slot:content>
            <p class="relative text-white">This is the card description</p>
        </template>
    </Card>
</template>

<script>
import Card from "./card/Card.vue";
export default {
    name: "Featurecard",
    components: { Card },
};
</script>

<style>
h2,
p {
    text-shadow: -3px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
