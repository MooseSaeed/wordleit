<template>
    <Card dataImage="./images/pic-sample.jpg">
        <template v-slot:cardImage> </template>
        <template v-slot:header> This is the header</template>
        <template v-slot:content> This is the header</template>
    </Card>
</template>

<script>
import Card from "./card/Card.vue";
export default {
    name: "Featurecard",
    components: { Card },
};
</script>

<style></style>
