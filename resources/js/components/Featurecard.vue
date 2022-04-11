<template>
    <section
        class="grid gap-y-10 sm:grid-cols-2 justify-items-center items-center"
    >
        <router-link to="/wordleiteditor">
            <Card dataImage="./images/wordleitoutcombined.gif">
                <template v-slot:header>
                    <h2 class="text-white text-xl font-bold">
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
        <router-link to="/streamer">
            <Card dataImage="./images/streamerposter.png">
                <template v-slot:header>
                    <h2 class="text-white text-xl font-bold">
                        Wordleit Streamer
                    </h2>
                </template>
                <template v-slot:content>
                    <p class="relative text-white">
                        A video streamer and audio transcriptor.
                    </p>
                </template>
            </Card>
        </router-link>
        <router-link to="/grammy">
            <Card dataImage="./images/robotposter.png">
                <template v-slot:header>
                    <h2 class="text-white text-xl font-bold">
                        Wordleit Grammy
                    </h2>
                </template>
                <template v-slot:content>
                    <p class="relative text-white">
                        AI speaking Pot created just to entertain you.
                    </p>
                </template>
            </Card>
        </router-link>

        <a href="https://bereadable.netlify.app/" target="__blank">
            <Card dataImage="./images/bereadableposter.png">
                <template v-slot:header>
                    <h2 class="text-white text-xl font-bold">BeReadable</h2>
                </template>
                <template v-slot:content>
                    <p class="relative text-white">
                        Online tool for live audio/podcast transcription.
                    </p>
                </template>
            </Card>
        </a>
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
