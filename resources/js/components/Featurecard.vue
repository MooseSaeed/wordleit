<template>
    <Card>
        <template v-slot:cardImage>
            <img
                class="card-bg max-w-3xl absolute -top-14 -left-14"
                :style="[cardBgTransform, cardBgImage]"
                src="/images/pic-sample.jpg"
                alt=""
            />
        </template>
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
